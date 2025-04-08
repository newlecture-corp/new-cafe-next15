import { createClient } from '@/utils/supabase/server';

import { Menu } from "../../../domain/entities/Menu";
import { MenuRepository } from "../../../domain/repositories/MenuRepository";

export class SbMenuRepository implements MenuRepository {
  async count(searchWord: string, categoryId: string | null): Promise<number> {
    // Supabase 클라이언트 인스턴스를 생성하여 데이터베이스와 상호작용.
    const supabase = await createClient();

    // "menu" 테이블에 대한 쿼리를 초기화하고, 모든 필드를 선택하며 정확한 행 수를 활성화.
    let query = supabase.from("menu").select("*", { count: "exact" });
    
    // 검색어가 제공된 경우 "kor_name" 필드에 대해 대소문자 구분 없이 부분 일치 필터 추가.
    if (searchWord) {
      query = query.ilike("kor_name", `%${searchWord}%`);
    }
    
    // 카테고리 ID가 제공된 경우 "category_id" 필드에 대해 일치 필터 추가.
    if (categoryId) {
      query = query.eq("category_id", categoryId);
    }

    // 쿼리를 실행하고 디버깅을 위해 가져온 행 수를 로그로 출력.
    const { count } = await query;
    console.log("count: 가져온 메뉴 수:", count);
    return count || 0; // 행 수를 반환하거나 행이 없으면 0 반환.
  }

  async findById(id: number): Promise<Menu> {
    const supabase = await createClient();

    // Fetch a menu by ID from the "menu" table
    const { data, error } = await supabase
      .from("menu")
      .select()
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(`Failed to fetch menu by ID: ${error.message}`);
    }

    // Return the fetched menu
    return {
      id: data.id,
      korName: data.kor_name,
      engName: data.eng_name,
      price: data.price,
      description: data.description,
      categoryId: data.category_id,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  }

  async findAll(searchWord: string, categoryId: string | null, offset: number, limit: number): Promise<Menu[]> {
    const supabase = await createClient();
    let query = supabase.from("menu").select().order("created_at", { ascending: false }).range(offset, offset + limit - 1);

    console.log("before searchWord, categoryId", searchWord, categoryId);

    // 인자에 따른 동적쿼리 작성
    if (searchWord && categoryId) {
      console.log("searchWord, categoryId", searchWord, categoryId);
      query = query.ilike("kor_name", `%${searchWord}%`).eq("category_id", categoryId);
    } else if (searchWord) {
      console.log("searchWord", searchWord);
      query = query.ilike("kor_name", `%${searchWord}%`);
    } else if (categoryId) {
      console.log("categoryId", categoryId);      
      query = query.eq("category_id", categoryId);
    }

    const { data } = await query;
    const menus: Menu[] = data?.map(m => ({
        id: m.id,
        korName: m.kor_name,
        engName: m.eng_name,
        price: m.price,
        description: m.description,
        categoryId: m.category_id,
        createdAt: m.created_at,
        updatedAt: m.updated_at,
    })) || [];
  
    return menus;
  }

  async save(menu: Menu): Promise<Menu> {
    const supabase = await createClient();

    // Insert the menu into the "menu" table
    const { data, error } = await supabase
      .from("menu")
      .insert({
      kor_name: menu.korName,
      eng_name: menu.engName,
      price: menu.price,
      description: menu.description,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to save menu: ${error.message}`);
    }

    // Return the saved menu
    return {
      id: data.id,
      korName: data.kor_name,
      engName: data.eng_name,
      price: data.price,
      categoryId: data.category_id,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      description: data.description,
    };
  }
}

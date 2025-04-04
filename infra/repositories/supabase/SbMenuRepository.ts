import { createClient } from '@/utils/supabase/server';

import { Menu } from "../../../domain/entities/Menu";
import { MenuRepository } from "../../../domain/repositories/MenuRepository";

export class SbMenuRepository implements MenuRepository {
async findById(id: number): Promise<Menu> {
    // Implement logic to fetch a menu by ID from Supabase
    console.log("Menu ID:", id);
    return {
        id: id,
        korName: "Sample Menu",
        engName: "Sample Menu",
        price: 10.99,
    };
}

  async findAll(): Promise<Menu[]> {
    const supabase = await createClient();
    const { data } = await supabase.from("menu").select();
    console.log("Fetched menus:", data);
    const menus: Menu[] = data?.map(m => ({
        id: m.id,
        korName: m.kor_name,
        engName: m.eng_name,
        price: m.price,
    })) || [];
  
    // Implement logic to fetch all menus from Supabase
    return menus;
  }

  async save(menu: Menu): Promise<Menu> {
    // Implement logic to save a menu to Supabase
    return menu;
  }
}

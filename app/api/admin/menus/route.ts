import { MenuListDto } from '@/application/usecases/admin/menu/dto/MenuListDto';
import MenuListUsecase from '@/application/usecases/admin/menu/MenuListUsecase';
import { SbCategoryRepository } from '@/infra/repositories/supabase/SbCategoryRepository';
import SbImageRepository from '@/infra/repositories/supabase/SbImageRepository';
import { SbMenuRepository } from '@/infra/repositories/supabase/SbMenuRepository';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        // URL에서 쿼리 파라미터를 가져옴
        const url = new URL(request.url);
        const pageParam = url.searchParams.get('p') || "1"; // Default to page 1 if not provided        
        const searchWordParam = url.searchParams.get('sw') || ""; // Default to empty string if not provided        
        const categoryIdParam = url.searchParams.get('c') || null; // Default to empty string if not provided
        
        // DI (Dependency Injection) - 의존성 주입
        const categoryRepository = new SbCategoryRepository();
        const menuRepository = new SbMenuRepository();
        const imageRepository = new SbImageRepository();
        const menuListUsecase = new MenuListUsecase(menuRepository,imageRepository,categoryRepository);
        const menuListDto: MenuListDto = await menuListUsecase.execute(
            Number(pageParam),
            categoryIdParam,
            searchWordParam
        );

        return NextResponse.json(menuListDto, { status: 200 });
    } catch (error) {
        console.error('Error fetching menus:', error);
        return NextResponse.json({ error: 'Failed to fetch menus' }, { status: 500 });
    }
}
import { GetMenuListUsecase } from "@/application/usecases/admin/menu/GetMenuListUsecase";
import { SbImageRepository } from "@/infra/repositories/supabase/SbImageRepository";
import { NextResponse } from "next/server";
import { GetMenuListQueryDto } from "@/application/usecases/admin/menu/dto/GetMenuListQueryDto";
import { GetMenuListDto } from "@/application/usecases/admin/menu/dto/GetMenuListDto";
import { SbAdminMenuViewRepository } from "@/infra/repositories/supabase/SbAdminMenuViewRepository";

export async function GET(request: Request) {
	try {
		// URL에서 쿼리 파라미터를 가져옴
		const url = new URL(request.url);
		const pageParam = url.searchParams.get("p") || "1"; // Default to page 1 if not provided
		const searchWordParam = url.searchParams.get("sw") || ""; // Default to empty string if not provided
		const categoryIdParam = url.searchParams.get("c") || undefined; // Default to undefined if not provided

		// DI (Dependency Injection) - 의존성 주입
		const menuRepository = new SbAdminMenuViewRepository();
		const imageRepository = new SbImageRepository();
		const getMenuListUsecase = new GetMenuListUsecase(
			menuRepository,
			imageRepository
		);

		const queryDto = new GetMenuListQueryDto(
			Number(pageParam),
			categoryIdParam,
			searchWordParam
		);
		const menuListDto: GetMenuListDto = await getMenuListUsecase.execute(
			queryDto
		);

		return NextResponse.json(menuListDto, { status: 200 });
	} catch (error) {
		console.error("Error fetching menus:", error);
		return NextResponse.json(
			{ error: "Failed to fetch menus" },
			{ status: 500 }
		);
	}
}

import { GetCategoryListQueryDto } from "@/application/usecases/category/dto/GetCategoryListQueryDto";
import { GetCategoryListUsecase } from "@/application/usecases/category/GetCategoryListUsecase";
import { CategoryRepository } from "@/domain/repositories/CategoryRepository";
import { SbCategoryRepository } from "@/infra/repositories/supabase/SbCategoryRepository";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	try {
		// URL에서 쿼리 파라미터를 가져옴
		const url = new URL(request.url);
		const pageParam = url.searchParams.get("p") || "1"; // Default to page 1 if not provided
		const nameParam = url.searchParams.get("name") || undefined;
		const orderParam = url.searchParams.get("asc") === "1" ? true : undefined;

		const categoryRepository: CategoryRepository = new SbCategoryRepository();
		const getCategoryListUsecase = new GetCategoryListUsecase(
			categoryRepository
		);

		// 모든 파라미터를 포함하여 DTO 생성
		const queryDto = new GetCategoryListQueryDto(
			Number(pageParam),
			nameParam,
			orderParam || true // 카테고리 관리자가 아닌 조회용은 오름차순이 기본
		);

		const categories = await getCategoryListUsecase.execute(queryDto);

		return NextResponse.json(categories);
	} catch (error) {
		console.error("Error fetching categories:", error);
		return NextResponse.json(
			{ error: "Failed to fetch categories" },
			{ status: 500 }
		);
	}
}

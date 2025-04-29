import { GetMenuListQueryDto } from "@/application/usecases/menu/dto/GetMenuListQueryDto";
import { GetMenuListUsecase } from "@/application/usecases/menu/GetMenuListUsecase";
import { MenuViewRepository } from "@/domain/repositories/MenuViewRepository";
import { SbMenuViewRepository } from "@/infra/repositories/supabase/SbMenuViewRepository";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
	try {
		// URL에서 쿼리 파라미터를 가져옴
		const url = new URL(request.url);
		const pageParam = url.searchParams.get("p") || undefined; // 제공되지 않으면 기본값은 페이지 1
		const categoryIdParam = url.searchParams.get("c") || undefined; // 카테고리 ID
		const searchNameParam = url.searchParams.get("n") || undefined;
		const sortFieldParam = url.searchParams.get("sf") || undefined; // 정렬 필드
		const ascendingParam = url.searchParams.get("asc") || undefined; // 정렬 순서 (asc 또는 desc)

		const repository: MenuViewRepository = new SbMenuViewRepository();
		const usecase = new GetMenuListUsecase(repository);

		// 모든 파라미터를 포함하여 DTO 생성
		const queryDto = new GetMenuListQueryDto(
			Number(pageParam),
			categoryIdParam, // 카테고리 ID
			searchNameParam,
			sortFieldParam, // 정렬 기준 필드, 기본값은 "order" 필드
			ascendingParam === "true" // 정렬 순서, 기본값은 true(오름차순)
		);

		const menus = await usecase.execute(queryDto);

		return NextResponse.json(menus);
	} catch (error) {
		console.error("카테고리 가져오기 오류:", error);
		return NextResponse.json(
			{ error: "카테고리를 가져오는 데 실패했습니다" },
			{ status: 500 }
		);
	}
}

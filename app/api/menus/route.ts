import { GetMenuListQueryDto } from "@/application/usecases/menu/dto/GetMenuListQueryDto";
import { GetMenuListUsecase } from "@/application/usecases/menu/GetMenuListUsecase";
import { MenuViewRepository } from "@/domain/repositories/MenuViewRepository";
import { PrMenuViewRepository } from "@/infra/repositories/prisma/PrMenuViewRepository";
import { getToken } from "next-auth/jwt";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		// URL에서 쿼리 파라미터를 가져옴
		const url: URL = new URL(request.url);
		const pageParam: string = url.searchParams.get("p") || "1"; // 제공되지 않으면 기본값은 페이지 1
		const categoryIdParam: string | undefined =
			url.searchParams.get("c") || undefined; // 카테고리 ID
		const searchNameParam = url.searchParams.get("n") || undefined;
		const sortFieldParam = url.searchParams.get("sf") || undefined; // 정렬 필드
		const ascendingParam = url.searchParams.get("asc") || undefined; // 정렬 순서 (asc 또는 desc)

		// 개인화된 데이터를 포함하기 위해 인증된 사용자 정보 가져오기
		const token = await getToken({ req: request }); // 로그인한 사용자의 ID를 가져오는 메소드

		// // 토큰 정보 확인용 코드
		// console.log("======== /menus/route.ts token 정보 확인 ========");
		// console.log("🔐 Raw Token:", token);
		// console.log("next-auth.session-token : ",request.cookies.get("next-auth.session-token"));
		// console.log("Token ID:", token?.id); // 로그인한 사용자의 ID 확인

		// 쿼리를 위한 사용자 입력 DTO 생성
		const queryDto = new GetMenuListQueryDto(
			token?.id, // 로그인한 사용자의 ID
			Number(pageParam),
			categoryIdParam, // 카테고리 ID
			searchNameParam,
			sortFieldParam, // 정렬 기준 필드, 기본값은 "order" 필드
			ascendingParam === "true" // 정렬 순서, 기본값은 true(오름차순)
		);

		// DI (Dependency Injection) - 의존성 주입
		const repository: MenuViewRepository = new PrMenuViewRepository();
		const usecase = new GetMenuListUsecase(repository);

		// Usecase(업무로직) 실행
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

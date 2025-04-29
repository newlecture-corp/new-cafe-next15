import { CreateCategoryUsecase } from "@/application/usecases/admin/category/CreateCategoryUsecase";
import { CreateCategoryDto } from "@/application/usecases/admin/category/dto/CreateCategoryDto";
import { GetCategoryListQueryDto } from "@/application/usecases/admin/category/dto/GetCategoryListQueryDto";
import { GetCategoryListUsecase } from "@/application/usecases/admin/category/GetCategoryListUsecase";
import { AdminCategoryViewRepository } from "@/domain/repositories/AdminCategoryViewRepository";
import { CategoryRepository } from "@/domain/repositories/CategoryRepository";
import { SbAdminCategoryViewRepository } from "@/infra/repositories/supabase/SbAdminCategoryViewRepository";

import { SbCategoryRepository } from "@/infra/repositories/supabase/SbCategoryRepository";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	try {
		// URL에서 쿼리 파라미터를 가져옴
		const url = new URL(request.url);
		const pageParam = url.searchParams.get("p") || undefined; // 제공되지 않으면 기본값은 페이지 1
		const nameParam = url.searchParams.get("name") || undefined;
		const includeAllParam = url.searchParams.get("all") || undefined;
		const sortFieldParam = url.searchParams.get("sf") || undefined; // 정렬 필드
		const ascendingParam = url.searchParams.get("asc") || undefined; // 정렬 순서 (asc 또는 desc)

		const categoryRepository: AdminCategoryViewRepository =
			new SbAdminCategoryViewRepository();
		const getCategoryListUsecase = new GetCategoryListUsecase(
			categoryRepository
		);

		// 모든 파라미터를 포함하여 DTO 생성
		const queryDto = new GetCategoryListQueryDto(
			Number(pageParam),
			nameParam,
			includeAllParam === "true", // 관리자 페이지이므로 값을 전달하지 않으면 기본값은 false(모든 레코드 반환)
			sortFieldParam, // 정렬 기준 필드, 기본값은 "order" 필드
			ascendingParam === "true" // 정렬 순서, 기본값은 true(오름차순)
		);

		const categories = await getCategoryListUsecase.execute(queryDto);

		return NextResponse.json(categories);
	} catch (error) {
		console.error("카테고리 가져오기 오류:", error);
		return NextResponse.json(
			{ error: "카테고리를 가져오는 데 실패했습니다" },
			{ status: 500 }
		);
	}
}

export async function POST(request: Request) {
	try {
		const body = await request.json();

		// 필수 필드 검증
		if (!body.name) {
			return NextResponse.json(
				{ error: "카테고리 이름은 필수입니다" },
				{ status: 400 }
			);
		}

		// 하이픈이 포함된 키를 camelCase로 변환
		const isPublic =
			body["is-public"] !== undefined ? body["is-public"] : body.isPublic;

		// DTO 생성
		const createCategoryDto = new CreateCategoryDto(
			body.name,
			isPublic || false
		);

		// 리포지토리 및 유스케이스 초기화
		const categoryRepository: CategoryRepository = new SbCategoryRepository();
		const createCategoryUsecase = new CreateCategoryUsecase(categoryRepository);

		// 유스케이스 실행
		const newCategory = await createCategoryUsecase.execute(createCategoryDto);

		return NextResponse.json(newCategory, { status: 201 });
	} catch (error) {
		console.error("카테고리 생성 오류:", error);
		return NextResponse.json(
			{ error: "카테고리를 생성하는 데 실패했습니다" },
			{ status: 500 }
		);
	}
}

// export async function PUT(request: Request) {
// 	try {
// 		const body = await request.json();

// 		// 필수 필드 검증
// 		if (!body.name) {
// 			return NextResponse.json(
// 				{ error: "카테고리 이름은 필수입니다" },
// 				{ status: 400 }
// 			);
// 		}

// 		const categoryRepository: CategoryRepository = new SbCategoryRepository();

// 		// 카테고리가 이미 존재하는지 확인
// 		const existingCategory = await categoryRepository.findByName(body.name);
// 		if (existingCategory) {
// 			return NextResponse.json(
// 				{ error: "이 이름의 카테고리가 이미 존재합니다" },
// 				{ status: 409 }
// 			);
// 		}

// 		// 새 카테고리 생성
// 		const newCategory = await categoryRepository.create({
// 			name: body.name,
// 			isPublic: body.isPublic || false,
// 		});

// 		return NextResponse.json(newCategory, { status: 201 });
// 	} catch (error) {
// 		console.error("카테고리 생성 오류:", error);
// 		return NextResponse.json(
// 			{ error: "카테고리를 생성하는 데 실패했습니다" },
// 			{ status: 500 }
// 		);
// 	}
// }

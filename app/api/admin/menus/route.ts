import { NextRequest, NextResponse } from "next/server";
import { getToken, JWT } from "next-auth/jwt";

// POST /api/admin/menus
import { PrMenuRepository } from "@/infra/repositories/prisma/admin/PrMenuRepository";
import { CreateMenuUsecase } from "@/application/usecases/admin/menu/CreateMenuUsecase";
import { CreateMenuDto } from "@/application/usecases/admin/menu/dto/CreateMenuDto";
import { CreatedMenuDto } from "@/application/usecases/admin/menu/dto/CreatedMenuDto";

// GET /api/admin/menus

import { GetMenuListUsecase } from "@/application/usecases/admin/menu/GetMenuListUsecase";
import { GetMenuListQueryDto } from "@/application/usecases/admin/menu/dto/GetMenuListQueryDto";
import { GetMenuListDto } from "@/application/usecases/admin/menu/dto/GetMenuListDto";

import { LocalFileRepository } from "@/infra/repositories/LocalFileRepository";
import { PrMenuImageRepository } from "@/infra/repositories/prisma/admin/PrMenuImageRepository";

export async function GET(request: NextRequest) {
	try {
		// 1. URL에서 쿼리 파라미터를 가져와서
		const url: URL = new URL(request.url);
		const pageParam: string = url.searchParams.get("p") || "1"; // Default to page 1 if not provided
		const categoryIdParam: string | undefined =
			url.searchParams.get("c") || undefined; // Default to undefined if not provided
		const searchNameParam = url.searchParams.get("n") || undefined;
		const sortFieldParam = url.searchParams.get("sf") || undefined; // 정렬 필드
		const ascendingParam = url.searchParams.get("asc") || undefined; // 정렬 순서 (asc 또는 desc)

		// 2. 쿼리를 위해 전달할 DTO 생성한 후
		const queryDto = new GetMenuListQueryDto(
			Number(pageParam),
			categoryIdParam,
			searchNameParam,
			sortFieldParam, // 정렬 기준 필드, 기본값은 "order" 필드
			ascendingParam === "true" // 정렬 순서, 기본값은 true(오름차순)
		);

		// 3. DI (Dependency Injection) - 의존성 주입을 해서
		const adminMenuViewRepository: PrMenuRepository = new PrMenuRepository();
		const getMenuListUsecase = new GetMenuListUsecase(adminMenuViewRepository);

		// 4. Usecase(업무로직) 실행한다.
		const menuListDto: GetMenuListDto = await getMenuListUsecase.execute(
			queryDto
		);

		// 5. 그 결과를 Dto로 변환하여 응답한다.
		return NextResponse.json(menuListDto, { status: 200 });
	} catch (error) {
		console.error("Error fetching menus:", error);
		return NextResponse.json(
			{ error: "Failed to fetch menus" },
			{ status: 500 }
		);
	}
}

// @ Multipart/form-data POST /api/admin/menus 를 처리할 때의 코드
export async function POST(request: NextRequest) {
	try {
		// 1. multipart/form-data 파싱
		const formData = await request.formData();
		console.log("== POST /api/admin/menus ==");
		console.log("Received formData:", formData);

		const korName = formData.get("kor-name") ?? formData.get("korName");
		const engName = formData.get("eng-name") ?? formData.get("engName");
		const price = Number(formData.get("price"));
		const categoryId =
			formData.get("category-id") !== null
				? Number(formData.get("category-id"))
				: Number(formData.get("categoryId"));
		const description = formData.get("description") as string | undefined;
		const image = formData.get("image") as File | null;

		// 2. 필수 필드 검증
		if (!korName) {
			return NextResponse.json(
				{ error: "메뉴 이름은 필수입니다" },
				{ status: 400 }
			);
		}

		// 3. 로그인한 사용자 정보 가져오기
		const token: JWT | null = await getToken({ req: request });
		const regMemberId: string = token?.id ?? "";

		// 4. DTO 생성
		const createMenuDto: CreateMenuDto = {
			categoryId,
			image,
			korName: String(korName),
			engName: engName ? String(engName) : "",
			price,
			regMemberId,
			description: description ?? "",
		};

		// 5. DI 및 Usecase 실행
		const menuRepository: PrMenuRepository = new PrMenuRepository();
		const menuImageRepository: PrMenuImageRepository =
			new PrMenuImageRepository();
		const fileRepository: LocalFileRepository = new LocalFileRepository();
		const createMenuUsecase = new CreateMenuUsecase(
			menuRepository,
			menuImageRepository,
			fileRepository
		);

		const createdMenuDto: CreatedMenuDto = await createMenuUsecase.execute(
			createMenuDto
		);

		// 6. 응답 반환
		return NextResponse.json(
			{ message: "Data received successfully", data: createdMenuDto },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error processing multipart POST request:", error);
		return NextResponse.json(
			{ error: "Failed to process request" },
			{ status: 500 }
		);
	}
}

// // @ JSON POST /api/admin/menus 를 처리할 때의 코드
// export async function POST(request: NextRequest) {
// 	try {
// 		// 1. JSON으로 전달한 데이터를 DTO로 변환하기 전에
// 		// 하이픈이 포함된 키가 있을 경우 camelCase로 변환하고
// 		const body: Record<string, string> = await request.json();
// 		const korName: string =
// 			body["kor-name"] !== undefined ? body["kor-name"] : body.korName;
// 		const engName: string =
// 			body["eng-name"] !== undefined ? body["eng-name"] : body.engName;
// 		const price: number = Number(body.price);
// 		const categoryId: number =
// 			body["category-id"] !== undefined
// 				? Number(body["category-id"])
// 				: Number(body.categoryId);
// 		const description: string = body.description;

// 		// 2. 필수 필드들을 검증하고
// 		if (!body.korName) {
// 			return NextResponse.json(
// 				{ error: "메뉴 이름은 필수입니다" },
// 				{ status: 400 }
// 			);
// 		}

// 		// 3. 필수 필드에 문제가 없으면 현재 로그인한 사용자 정보를 가져와서
// 		const token: JWT | null = await getToken({ req: request }); // 로그인한 사용자의 ID를 가져오는 메소드
// 		const regMemberId: string = token?.id ?? ""; // 로그인한 사용자의 ID 확인

// 		// 4. Menu를 등록하기 위한 DTO 객체를 변환해 둔 후
// 		const createMenuDto: CreateMenuDto = {
// 			categoryId,
// 			korName,
// 			engName,
// 			price,
// 			regMemberId,
// 			description,
// 		};

// 		// 입력 데이터 확인 (여기서는 단순히 로그로 출력)
// 		// console.log(memberId);
// 		// console.log("Received data:", createMenuDto);

// 		// 4. DI (Dependency Injection) - 의존성 주입을 하고
// 		const menuRepository: PrMenuRepository = new PrMenuRepository();
// 		const createMenuUsecase = new CreateMenuUsecase(menuRepository);

// 		// 5. Usecase(업무로직) 실행한다.
// 		const createdMenuDto: CreatedMenuDto = await createMenuUsecase.execute(
// 			createMenuDto
// 		);

// 		// 6. 그 결과를 DTO로 변환하여 응답한다.
// 		return NextResponse.json(
// 			{ message: "Data received successfully", data: createdMenuDto },
// 			{ status: 200 }
// 		);
// 	} catch (error) {
// 		console.error("Error processing POST request:", error);
// 		return NextResponse.json(
// 			{ error: "Failed to process request" },
// 			{ status: 500 }
// 		);
// 	}
// }

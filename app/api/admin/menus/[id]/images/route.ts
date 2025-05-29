import { GetMenuImageListUsecase } from "@/application/usecases/admin/menu/GetMenuImageListUsecase";
import { PrMenuImageRepository } from "@/infra/repositories/prisma/PrMenuImageRepository";
import { NextResponse } from "next/server";

interface RequestParams {
	params: Promise<{
		id: string;
	}>;
}
// GET /api/admin/menus/[id]/images
export async function GET(request: Request, { params }: RequestParams) {
	// 1. URL에서 [id] 값을 추출
	const { id } = await params;

	// 2. DI (Dependency Injection) - 의존성 주입을 해서
	const menuImageRepository = new PrMenuImageRepository();
	const getMenuImageListUsecase = new GetMenuImageListUsecase(
		menuImageRepository
	);

	// 3. Usecase(업무로직) 실행한다.
	const images = await getMenuImageListUsecase.execute(Number(id));

	// 4. 그 결과를 DTO로 변환하여 응답한다.
	return NextResponse.json(images);
}

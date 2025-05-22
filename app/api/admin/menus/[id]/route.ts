import { GetMenuRowExUsecase } from "@/application/usecases/admin/menu/GetMenuRowExUsecase";
import { PrAdminMenuRepository } from "@/infra/repositories/prisma/admin/PrMenuRepository";
import { NextResponse } from "next/server";

interface RequestParams {
	params: Promise<{
		id: string;
	}>;
}

export async function GET(request: Request, { params }: RequestParams) {
	try {
		const { id } = await params; // Extracting the id from the request parameters
		console.log("ID from params:", id); // Logging the ID for debugging

		// // DI (Dependency Injection) - 의존성 주입
		const adminMenuRepository = new PrAdminMenuRepository();
		const getMenuRowExUsecase = new GetMenuRowExUsecase(adminMenuRepository);

		const menuListRowExDto = await getMenuRowExUsecase.execute(id); // Fetching the menu details using the use case

		return NextResponse.json(menuListRowExDto, { status: 200 });
	} catch (error) {
		console.error("Error fetching menus:", error);
		return NextResponse.json(
			{ error: "Failed to fetch menus" },
			{ status: 500 }
		);
	}
}

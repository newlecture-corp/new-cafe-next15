import { CategoryListDto } from "@/application/usecases/category/dto/CategoryListDto";
import { GetCategoryListUsecase } from "@/application/usecases/category/GetCategoryListUsecase";
import { PrCategoryRepository } from "@/infra/repositories/prisma/PrCategoryRepository";

import { NextResponse } from "next/server";

export async function GET() {
	try {
		const getCategoryListUsecase = new GetCategoryListUsecase(
			new PrCategoryRepository()
		);

		const categoryListDto: CategoryListDto =
			await getCategoryListUsecase.execute();

		return NextResponse.json(categoryListDto);
	} catch (error) {
		console.error("Error fetching categories:", error);
		return NextResponse.json(
			{ error: "Failed to fetch categories" },
			{ status: 500 }
		);
	}
}

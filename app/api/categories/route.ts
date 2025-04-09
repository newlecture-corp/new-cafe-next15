import { CategoryListUsecase } from "@/application/usecases/category/GetCategoryListUsecase";
import { CategoryRepository } from "@/domain/repositories/CategoryRepository";
import { SbCategoryRepository } from "@/infra/repositories/supabase/SbCategoryRepository";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const categoryRepository: CategoryRepository = new SbCategoryRepository();
		const categoryUsecase = new CategoryListUsecase(categoryRepository);
		const categories = await categoryUsecase.execute();

		return NextResponse.json(categories);
	} catch (error) {
		console.error("Error fetching categories:", error);
		return NextResponse.json(
			{ error: "Failed to fetch categories" },
			{ status: 500 }
		);
	}
}

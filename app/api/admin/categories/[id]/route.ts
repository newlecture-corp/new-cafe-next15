import { DeleteCategoryUsecase } from "@/application/usecases/admin/category/DeleteCategoryUsecase";
import { PrCategoryRepository } from "@/infra/repositories/prisma/admin/PrCategoryRepository";
import { NextResponse } from "next/server";

interface RequestParams {
	params: Promise<{
		id: string;
	}>;
}

export async function DELETE(request: Request, { params }: RequestParams) {
	try {
		const { id } = await params;

		if (!id) {
			return NextResponse.json(
				{ error: "Category ID is required" },
				{ status: 400 }
			);
		}

		const deleteCategoryUsecase = new DeleteCategoryUsecase(
			new PrCategoryRepository()
		);

		await deleteCategoryUsecase.execute(Number(id));

		return NextResponse.json({ message: "Category deleted successfully" });
	} catch (error) {
		console.error("Error deleting category:", error);
		return NextResponse.json(
			{ error: "Failed to delete category" },
			{ status: 500 }
		);
	}
}

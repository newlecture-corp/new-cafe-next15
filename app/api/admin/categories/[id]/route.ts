import { DeleteCategoryUsecase } from "@/application/usecases/admin/category/DeleteCategoryUsecase";
import { SbCategoryRepository } from "@/infra/repositories/supabase/SbCategoryRepository";
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
			new SbCategoryRepository()
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

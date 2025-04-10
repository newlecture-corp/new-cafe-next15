import { ToggleCategoryPublicDto } from "@/application/usecases/admin/category/dto/ToggleCategoryPublicDto";
import { ToggleCategoryPublicUsecase } from "@/application/usecases/admin/category/ToggleCategoryPublicUsecase";
import { SbCategoryRepository } from "@/infra/repositories/supabase/SbCategoryRepository";
import { NextRequest, NextResponse } from "next/server";

interface RequestParams {
	params: {
		id: number;
	};
}

export async function PUT(req: NextRequest, { params }: RequestParams) {
	const { id } = params;

	if (!id) {
		return NextResponse.json(
			{ error: "Category ID is required" },
			{ status: 400 }
		);
	}

	try {
		const body = await req.json();
		const { isPublic } = body;

		if (typeof isPublic !== "boolean") {
			return NextResponse.json(
				{ error: "isPublic must be a boolean" },
				{ status: 400 }
			);
		}

		// Update the category's isPublic status in the database (mocked here)
		// Example: await db.category.update({ where: { id }, data: { isPublic } });

		const toggleCategoryPublicUsecase = new ToggleCategoryPublicUsecase(
			new SbCategoryRepository()
		);

		const updatedCategory = toggleCategoryPublicUsecase.execute(
			new ToggleCategoryPublicDto(id, isPublic)
		);

		return NextResponse.json({
			message: `Category ${id} updated successfully`,
			updatedCategory,
		});
	} catch {
		return NextResponse.json(
			{ error: "Failed to update category" },
			{ status: 500 }
		);
	}
}

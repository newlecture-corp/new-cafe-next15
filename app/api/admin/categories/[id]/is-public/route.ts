import { ToggleCategoryPublicDto } from "@/application/usecases/admin/category/dto/ToggleCategoryPublicDto";
import { ToggleCategoryPublicUsecase } from "@/application/usecases/admin/category/ToggleCategoryPublicUsecase";
import { SbCategoryRepository } from "@/infra/repositories/supabase/SbCategoryRepository";
import { NextRequest, NextResponse } from "next/server";

interface RequestParams {
	params: Promise<{
		id: string;
	}>;
}

export async function PUT(req: NextRequest, { params }: RequestParams) {
	const { id } = await params;

	if (!id) {
		return NextResponse.json(
			{ error: "Category ID is required" },
			{ status: 400 }
		);
	}

	try {
		const body: { isPublic: boolean } = await req.json();
		const { isPublic } = body;

		if (typeof isPublic !== "boolean") {
			return NextResponse.json(
				{ error: "isPublic must be a boolean" },
				{ status: 400 }
			);
		}

		const toggleCategoryPublicUsecase = new ToggleCategoryPublicUsecase(
			new SbCategoryRepository()
		);

		const updatedCategory = await toggleCategoryPublicUsecase.execute(
			new ToggleCategoryPublicDto(Number(id), isPublic)
		);

		return NextResponse.json({
			message: `Category ${id} updated successfully`,
			updatedCategory,
		});
	} catch (error) {
		return NextResponse.json(
			{
				error: "Failed to update category",
				details: error instanceof Error ? error.message : undefined,
			},
			{ status: 500 }
		);
	}
}

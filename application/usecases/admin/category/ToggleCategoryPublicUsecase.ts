import { CategoryRepository } from "@/domain/repositories/admin/CategoryRepository";
import { ToggleCategoryPublicDto } from "./dto/ToggleCategoryPublicDto";

export class ToggleCategoryPublicUsecase {
	constructor(private readonly categoryRepository: CategoryRepository) {}

	async execute(toggleDto: ToggleCategoryPublicDto): Promise<void> {
		// 1. 토글 할 카테고리를 가져와서
		const category = await this.categoryRepository.findById(toggleDto.id);
		if (!category) {
			throw new Error("Category not found");
		}

		// 2. 카테고리의 공개 여부를 토글하고
		category.isPublic = !category.isPublic;

		// 3. 카테고리를 업데이트 한다.
		await this.categoryRepository.update(category);
	}
}

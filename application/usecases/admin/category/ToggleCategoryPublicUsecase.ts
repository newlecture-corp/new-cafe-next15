import { CategoryRepository } from "@/domain/repositories/CategoryRepository";
import { ToggleCategoryPublicDto } from "./dto/ToggleCategoryPublicDto";

export class ToggleCategoryPublicUsecase {
	constructor(private readonly categoryRepository: CategoryRepository) {}

	async execute(toggleDto: ToggleCategoryPublicDto): Promise<void> {
		const category = await this.categoryRepository.findById(toggleDto.id);
		if (!category) {
			throw new Error("Category not found");
		}

		category.isPublic = !category.isPublic;
		await this.categoryRepository.update(category);
	}
}

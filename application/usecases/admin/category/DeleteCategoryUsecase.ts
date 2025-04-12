import { CategoryRepository } from "@/domain/repositories/CategoryRepository";

export class DeleteCategoryUsecase {
	constructor(private readonly categoryRepository: CategoryRepository) {}

	async execute(categoryId: number): Promise<void> {
		if (!categoryId) {
			throw new Error("Category ID is required");
		}

		await this.categoryRepository.deleteById(categoryId);
	}
}

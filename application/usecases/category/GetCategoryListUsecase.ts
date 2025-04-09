import { Category } from "@/domain/entities/Category";
import { CategoryRepository } from "@/domain/repositories/CategoryRepository";

export class GetCategoryListUsecase {
	constructor(private categoryRepository: CategoryRepository) {}

	async execute(): Promise<Category[]> {
		try {
			const categories = await this.categoryRepository.findAll();
			return categories;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Failed to fetch categories: ${error.message}`);
			} else {
				throw new Error("Failed to fetch categories: Unknown error");
			}
		}
	}
}

import { CategoryRepository } from "@/domain/repositories/CategoryRepository";
import { CategoryListDto } from "./dto/CategoryListDto";

export class GetCategoryListUsecase {
	constructor(private categoryRepository: CategoryRepository) {}

	async execute(): Promise<CategoryListDto> {
		try {
			const categories = await this.categoryRepository.findAll();

			return {
				categories,
			} as CategoryListDto;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Failed to fetch category list: ${error.message}`);
			} else {
				throw new Error(
					"Failed to fetch category list due to an unknown error."
				);
			}
		}
	}
}

import { CategoryRepository } from "@/domain/repositories/CategoryRepository";
import { CategoryListDto } from "./dto/CategoryListDto";
import { CategoryDto } from "./dto/CategoryDto";
import { Category } from "@/prisma/generated";

export class GetCategoryListUsecase {
	constructor(private categoryRepository: CategoryRepository) {}

	async execute(): Promise<CategoryListDto> {
		// 1. 데이터를 쿼리하고
		let categories: Category[];
		{
			try {
				const categories = await this.categoryRepository.findAll();

				return {
					categories: categories.map((category: Category) => ({
						...category,
					})), // Category 타입으로 변환
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

		// 2. 쿼리 결과를 DTO로 변환하여 반환한다.
		let categoryListDto: CategoryListDto;
		{
			const categoryDtos: CategoryDto[] = categories.map(
				(category: Category) => ({
					...category,
				})
			);

			categoryListDto = {
				categories: categoryDtos,
			} as CategoryListDto;

			// console.log("categoryDtos", categoryDtos);
		}

		// 3. DTO 객체를 생성하여 반환
		return categoryListDto;
	}
}

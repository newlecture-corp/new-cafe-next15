import { CategoryRepository } from "@/domain/repositories/CategoryRepository";
import { CategoryListDto } from "./dto/CategoryListDto";
import { CategoryDto } from "./dto/CategoryDto";
import { Category } from "@/prisma/generated";

export class GetCategoryListUsecase {
	constructor(private categoryRepository: CategoryRepository) {}

	async execute(): Promise<CategoryListDto> {
		// 카테고리 엔티티 목록을 가져오기
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

		// 카테고리 엔티티 목록을 CategoryDto[] 배열로 변환하여 반환
		let categoryDtos: CategoryDto[];
		{
			categoryDtos = categories.map((category: Category) => ({
				...category,
			}));

			console.log("categoryDtos", categoryDtos);
		}

		// CategoryListDto 객체를 생성하여 반환
		return {
			categories: categoryDtos,
		} as CategoryListDto;
	}
}

// /c:/Project/newlecture-corp/new-cafe-next15/application/usecases/admin/category/CreateCategoryUsecase.ts

import { CategoryRepository } from "@/domain/repositories/CategoryRepository";
import { CreateCategoryDto } from "./dto/CreateCategoryDto";
import { Category } from "@/domain/entities/Category";

export class CreateCategoryUsecase {
	private categoryRepository: CategoryRepository;

	constructor(categoryRepository: CategoryRepository) {
		this.categoryRepository = categoryRepository;
	}

	async execute(createDto: Partial<CreateCategoryDto>): Promise<Category> {
		const category: Category = new Category();
		category.name = createDto.name;
		category.isPublic = createDto.isPublic ?? false;

		const newCategory = await this.categoryRepository.save(category);
		return newCategory;
	}
}

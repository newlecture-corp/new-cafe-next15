import { CategoryRepository } from "@/domain/repositories/admin/CategoryRepository";
import { CreateCategoryDto } from "./dto/CreateCategoryDto";
import { Category } from "@/prisma/generated";

export class CreateCategoryUsecase {
	private categoryRepository: CategoryRepository;

	constructor(categoryRepository: CategoryRepository) {
		this.categoryRepository = categoryRepository;
	}

	async execute(
		createDto: Partial<CreateCategoryDto>
	): Promise<CreateCategoryDto> {
		// 1. 사용자가 입력한 값을 Partial<Category> 객체로 변환하고
		const category: Partial<Category> = {
			name: createDto.name,
			isPublic: createDto.isPublic ?? false,
			regMemberId: String(createDto.regMemberId), // 인증된 사용자 정보에서 가져온 값이어야 함
		};

		// 2. 데이터를 저장하는 쿼리를 실행하고
		const createdCategory: Category = await this.categoryRepository.save(
			category as Category
		);

		// 확인용 log 출력
		// console.log("========= admin/CreateCategoryUsecase.execute =======");
		// console.log("createdCategory", createdCategory);
		// console.log("=============================================");

		// 3. 새로 저장한 데이터의 식별자를 포함하는 Category객체를 CreatedCategoryDto로 변환하여 반환한다.
		const createdCategoryDto: CreateCategoryDto = {
			...createdCategory,
		} as CreateCategoryDto;

		return createdCategoryDto;
	}
}

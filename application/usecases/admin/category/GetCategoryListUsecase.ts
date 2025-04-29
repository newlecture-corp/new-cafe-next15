import { CategoryListDto } from "./dto/CategoryListDto";

import { AdminCategoryViewCriteria } from "@/domain/repositories/criteria/AdminCategoryViewCriteria";
import { CategoryDto } from "./dto/CategoryDto";
import { AdminCategoryViewRepository } from "@/domain/repositories/AdminCategoryViewRepository";
import { GetCategoryListQueryDto } from "./dto/GetCategoryListQueryDto";

export class GetCategoryListUsecase {
	constructor(private repository: AdminCategoryViewRepository) {}

	async execute(queryDto: GetCategoryListQueryDto): Promise<CategoryListDto> {
		try {
			// 데이터 쿼리를 위한 변수 설정
			const pageSize = 10; // 한 페이지에 표현할 레코드 크기를 정의
			const currentPage = queryDto.page || 1; // 현재 페이지를 정의

			// 페이지 번호를 offset과 limit으로 변환
			const offset = (currentPage - 1) * pageSize; // 페이지당 10개 메뉴를 보여준다고 가정
			const limit = pageSize; // 페이지당 10개 메뉴를 보여준다고 가정

			// 데이터 쿼리
			const filter = new AdminCategoryViewCriteria(
				queryDto.name,
				queryDto.sortField,
				queryDto.ascending,
				offset,
				limit,
				queryDto.includeAll,
				true
			);

			const categories = await this.repository.findAll(filter);
			const totalCount = await this.repository.count(filter); // 카테고리 수를 가져오는 메소드 호출
			const endPage = Math.ceil(totalCount / 10); // 페이지당 10개 카테고리로 가정
			const pages = Array.from({ length: endPage }, (_, i) => i + 1); // 페이지 번호 배열 생성
			const categoryDtos = categories.map(
				(category) =>
					({
						...category,
					} as CategoryDto)
			); // Category 타입으로 변환);

			const categoryListDto: CategoryListDto = {
				categories: categoryDtos,
				totalCount,
				endPage,
				pages,
			};

			return categoryListDto;
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

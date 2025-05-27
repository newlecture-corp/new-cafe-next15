import { CategoryListDto } from "./dto/CategoryListDto";

import { CategoryDto } from "./dto/CategoryDto";

import { GetCategoryListQueryDto } from "./dto/GetCategoryListQueryDto";
import { CategoryRepository } from "@/domain/repositories/admin/CategoryRepository";
import { CategoryViewCriteria } from "@/domain/repositories/criteria/admin/CategoryViewCriteria";
import { CategoryView } from "@/domain/entities/admin/CategoryView";

export class GetCategoryListUsecase {
	constructor(private repository: CategoryRepository) {}

	async execute(queryDto: GetCategoryListQueryDto): Promise<CategoryListDto> {
		try {
			// 1. 데이터 쿼리를 위해 사용자가 입력한 데이터를 Criteria로 변환하고
			let criteria: CategoryViewCriteria;
			{
				// 데이터 쿼리를 위한 변수 설정
				const pageSize = 10; // 한 페이지에 표현할 레코드 크기를 정의
				const currentPage = queryDto.page || 1; // 현재 페이지를 정의

				// 페이지 번호를 offset과 limit으로 변환
				const offset = (currentPage - 1) * pageSize; // 페이지당 10개 메뉴를 보여준다고 가정
				const limit = pageSize; // 페이지당 10개 메뉴를 보여준다고 가정

				// - 데이터 쿼리를 위한 Criteria 객체
				criteria = {
					name: queryDto.name,
					sortField: queryDto.sortField,
					ascending: queryDto.ascending,
					offset: offset,
					limit: limit,
					includeAll: queryDto.includeAll,
					includeMenu: true, // 메뉴 포함 여부
				} as CategoryViewCriteria;
			}

			// 2. Criteria를 사용하여 데이터를 쿼리하고
			let totalCount: number;
			let endPage: number;
			let categories: CategoryView[];
			let pages: number[];
			{
				categories = await this.repository.findViewAll(criteria);
				totalCount = await this.repository.count(criteria); // 카테고리 수를 가져오는 메소드 호출
				endPage = Math.ceil(totalCount / 10); // 페이지당 10개 카테고리로 가정
				pages = Array.from({ length: endPage }, (_, i) => i + 1); // 페이지 번호 배열 생성
			}

			// 3. 쿼리 결과를 DTO로 변환하여
			let categoryListDto: CategoryListDto;
			{
				let categoryDtos: CategoryDto[] = [];
				categoryDtos = categories.map(
					(category) =>
						({
							...category,
						} as CategoryDto)
				); // Category 타입으로 변환);

				categoryListDto = {
					categories: categoryDtos,
					totalCount,
					endPage,
					pages,
				};
			}

			console.log("categoryListDto", categoryListDto);

			// 4. DTO 객체를 생성하여 반환
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

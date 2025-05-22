import { GetMenuListQueryDto } from "./dto/GetMenuListQueryDto";
import { MenuViewCriteria } from "@/domain/repositories/criteria/admin/MenuViewCriteria";

import { GetMenuListDto } from "./dto/GetMenuListDto";
import { MenuRepository } from "@/domain/repositories/admin/MenuRepository";
import { MenuView } from "@/domain/entities/admin/MenuView";

export class GetMenuListUsecase {
	private repository: MenuRepository;

	// 생성자에서 MenuRepository를 주입
	constructor(adminMenuRepository: MenuRepository) {
		this.repository = adminMenuRepository;
	}

	async execute(queryDto: GetMenuListQueryDto): Promise<GetMenuListDto> {
		try {
			// 1. 데이터 쿼리를 위해 사용자가 입력한 데이터를 Criteria로 변환하고
			// - 데이터 쿼리를 위한 변수 설정
			const pageSize = 10; // 한 페이지에 표현할 레코드 크기를 정의
			const currentPage = queryDto.page || 1; // 현재 페이지를 정의

			// - 페이지 번호를 offset과 limit으로 변환
			const offset = (currentPage - 1) * pageSize; // 페이지당 10개 메뉴를 보여준다고 가정
			const limit = pageSize; // 페이지당 10개 메뉴를 보여준다고 가정

			// - 데이터 쿼리를 위한 Criteria 객체
			const criteria = new MenuViewCriteria(
				queryDto.searchName,
				queryDto.categoryId,
				queryDto.sortField,
				queryDto.ascending,
				queryDto.includeAll,
				offset,
				limit
			);

			// 2. Criteria를 사용하여 데이터를 쿼리하고
			const menus: MenuView[] = await this.repository.findViewAll(criteria);
			const totalCount: number = await this.repository.count(criteria);
			const endPage = Math.ceil(totalCount / pageSize); // 페이지의 마지막 번호를 생성

			// 확인용 log 출력
			// console.log("--- menuListUsecase.execute ---");
			// console.log("메뉴 개수:", totalCount); // 메뉴 개수를 콘솔에 출력
			// console.log("메뉴 목록:", menus); // 메뉴 목록을 콘솔에 출력

			// 3. 쿼리 결과를 DTO로 변환하여 반환한다.
			return {
				menus: menus.map((menu) => ({
					...menu,
					defaultImage: menu.defaultImage || "default.png", // 첫 번째 이미지 URL을 기본 이미지로 설정
				})), // Menu 타입으로 변환
				currentPage,
				endPage, // 페이지당 10개 메뉴로 가정
			} as GetMenuListDto; // GetMenuListDto 타입으로 반환
		} catch (error) {
			console.error("메뉴를 가져오는 중 오류 발생:", error);
			throw new Error("메뉴를 가져오지 못했습니다");
		}
	}
}

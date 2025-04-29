import { MenuView } from "@/domain/entities/MenuView";
import { GetMenuListDto } from "./dto/GetMenuListDto";
import { GetMenuListQueryDto } from "./dto/GetMenuListQueryDto";
import { MenuViewCriteria } from "@/domain/repositories/criteria/MenuViewCriteria";
import { MenuViewRepository } from "@/domain/repositories/MenuViewRepository";

export class GetMenuListUsecase {
	private repository: MenuViewRepository;

	constructor(repository: MenuViewRepository) {
		this.repository = repository;
	}

	async execute(queryDto: GetMenuListQueryDto): Promise<GetMenuListDto> {
		// 데이터 쿼리를 위한 변수 설정
		const pageSize = 8; // 한 페이지에 표현할 레코드 크기를 정의
		const currentPage = queryDto.page || 1; // 현재 페이지를 정의

		// 페이지 번호를 offset과 limit으로 변환
		const offset = (currentPage - 1) * pageSize; // 페이지당 10개 메뉴를 보여준다고 가정
		const limit = pageSize; // 페이지당 10개 메뉴를 보여준다고 가정

		const criteria: MenuViewCriteria = new MenuViewCriteria(
			queryDto.searchName,
			queryDto.categoryId,
			queryDto.sortField,
			queryDto.ascending,
			false,
			offset,
			limit
		);

		const menus: MenuView[] = await this.repository.findAll(criteria);
		const totalCount = await this.repository.count(criteria); // 메뉴 수를 가져오는 메소드 호출
		const endPage = Math.ceil(totalCount / pageSize); // 마지막 페이지를 정의

		console.log("메뉴 개수:", totalCount); // 메뉴 개수를 콘솔에 출력
		console.log("메뉴 목록:", menus); // 메뉴 목록을 콘솔에 출력
		console.log("현재 페이지:", currentPage); // 현재 페이지를 콘솔에 출력
		console.log("마지막 페이지:", endPage); // 마지막 페이지를 콘솔에 출력

		return {
			menus: menus.map((menu) => ({
				...menu,
				defaultImage: menu.defaultImage || null, // 기본 이미지가 없을 경우 null로 설정
			})), // Menu 타입으로 변환
			currentPage: currentPage,
			endPage: endPage, // 페이지당 10개 메뉴로 가정
		};
	}
}

import { MenuView } from "@/domain/entities/MenuView";
import { GetMenuListDto } from "./dto/GetMenuListDto";
import { GetMenuListQueryDto } from "./dto/GetMenuListQueryDto";
import { MenuViewCriteria } from "@/domain/repositories/criteria/MenuViewCriteria";
import { MenuRepository } from "@/domain/repositories/MenuRepository";

export class GetMenuListUsecase {
	private repository: MenuRepository;

	constructor(repository: MenuRepository) {
		this.repository = repository;
	}

	async execute(queryDto: GetMenuListQueryDto): Promise<GetMenuListDto> {
		// 데이터 쿼리를 위한 변수 설정
		const pageSize = 8; // 한 페이지에 표현할 레코드 크기를 정의
		const currentPage = queryDto.page || 1; // 현재 페이지를 정의

		// 페이지 번호를 offset과 limit으로 변환
		const offset = (currentPage - 1) * pageSize; // 페이지당 10개 메뉴를 보여준다고 가정
		const limit = pageSize; // 페이지당 10개 메뉴를 보여준다고 가정

		// 쿼리 파라미터를 기반으로 MenuViewCriteria 객체 생성
		const criteria: MenuViewCriteria = new MenuViewCriteria(
			queryDto.searchName,
			queryDto.categoryId,
			queryDto.memberId, // 로그인한 사용자의 ID
			queryDto.sortField,
			queryDto.ascending,
			true, // publicOnly를 true로 설정
			offset,
			limit
		);

		// 메뉴 목록을 가져오는 쿼리 실행
		const menus: MenuView[] = await this.repository.findAll(criteria);
		const totalCount = await this.repository.count(criteria); // 메뉴 수를 가져오는
		// endPage 연산 최소 번호는 1이 되도록 연산
		const endPage = Math.max(1, Math.ceil(totalCount / pageSize)); // 마지막 페이지를 정의, 최소값을 1로 설정

		// 메뉴 목록을 DTO로 변환하여 반환
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

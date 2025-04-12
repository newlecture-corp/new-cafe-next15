import { MenuRepository } from "@/domain/repositories/MenuRepository";
import { MenuListDto } from "./dto/MenuListDto";
import { Menu } from "@/domain/entities/Menu";
import { ImageRepository } from "@/domain/repositories/ImageRepository";
import { MenuDto } from "./dto/MenuDto";
import { GetMenuListQueryDto } from "./dto/GetMenuListQueryDto";
import { MenuFilter } from "@/domain/repositories/filters/MenuFilter";
import { ImageDto } from "./dto/ImageDto";

export class GetMenuListUsecase {
	private menuRepository: MenuRepository;
	private imageRepository: ImageRepository;

	// 생성자에서 MenuRepository를 주입
	constructor(
		menuRepository: MenuRepository,
		imageRepository: ImageRepository
	) {
		this.menuRepository = menuRepository;
		this.imageRepository = imageRepository;
	}

	async execute(queryDto: GetMenuListQueryDto) {
		try {
			// 데이터 쿼리를 위한 변수 설정
			const pageSize = 10; // 한 페이지에 표현할 레코드 크기를 정의
			const currentPage = queryDto.page || 1; // 현재 페이지를 정의

			// 페이지 번호를 offset과 limit으로 변환
			const offset = (currentPage - 1) * pageSize; // 페이지당 10개 메뉴를 보여준다고 가정
			const limit = pageSize; // 페이지당 10개 메뉴를 보여준다고 가정

			// 데이터 쿼리
			const filter = new MenuFilter(
				queryDto.searchWord,
				queryDto.categoryId,
				offset,
				limit
			);
			const menus: Menu[] = await this.menuRepository.findAll(filter); // 메뉴를 가져오는 메소드 호출
			const totalCount: number = await this.menuRepository.count(filter);
			const menuDtos: MenuDto[] = await Promise.all(
				menus.map(async (menu) => {
					const image: ImageDto | null =
						await this.imageRepository.findDefaultByMenuId(menu.id);
					const images: ImageDto[] = await this.imageRepository.findAllByMenuId(
						menu.id
					);
					return {
						...menu,
						description: menu.description || "", // Ensure description is always a string
						defaultImage: image?.name || "blank.png",
						images,
					};
				})
			); // MenuDto로 변환

			// MenuListDto 데이터 구성
			const startPage = Math.floor((currentPage - 1) / pageSize) * pageSize + 1;
			const endPage = Math.ceil(totalCount / pageSize); // 페이지의 마지막 번호를 생성
			const pages = Array.from({ length: 5 }, (_, i) => startPage + i).filter(
				(pageNumber) => pageNumber <= endPage
			); // 현재 페이지를 기준으로 5개의 페이지 번호를 생성

			// MenuListDto 객체 생성
			const menuListDto: MenuListDto = {
				menus: menuDtos,
				totalCount,
				endPage, // 모든 메뉴가 한 페이지에 맞는다고 가정
				pages, // 모든 메뉴가 한 페이지에 맞는다고 가정
			};

			return menuListDto;
		} catch (error) {
			console.error("메뉴를 가져오는 중 오류 발생:", error);
			throw new Error("메뉴를 가져오지 못했습니다");
		}
	}
}

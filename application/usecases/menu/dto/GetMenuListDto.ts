import { MenuDto } from "./MenuDto";

export class GetMenuListDto {
	constructor(
		public menus?: MenuDto[],

		// pager 를 위한 데이터
		public currentPage?: number,
		public endPage?: number
	) {}
}

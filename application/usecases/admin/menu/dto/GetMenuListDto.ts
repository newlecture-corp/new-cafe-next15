import { MenuDto } from "./MenuDto";

export class GetMenuListDto {
	constructor(
		public menus: MenuDto[],

		public currentPage: number,
		public endPage: number
	) {}
}

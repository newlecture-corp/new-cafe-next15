import { MenuDto } from "./MenuDto";

export class MenuListDto {
	constructor(
		public menus: MenuDto[],

		public totalCount: number,
		public endPage: number,
		public pages: number[]
	) {}
}

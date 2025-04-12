import { Menu } from "./Menu";

export class Category {
	constructor(
		public id?: number,
		public name?: string,
		public isPublic: boolean = true,
		public order: number = 0,
		public createdAt?: Date,

		public menus?: Menu[]
	) {}
}

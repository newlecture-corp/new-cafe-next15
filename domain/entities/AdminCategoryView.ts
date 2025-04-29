import { Category } from "./Category";
import { Menu } from "./Menu";

export class AdminCategoryView extends Category {
	constructor(
		id?: number,
		name?: string,
		isPublic: boolean = true,
		order: number = 0,
		createdAt?: Date,
		menus?: Menu[],
		public menuCount: number = 0
	) {
		super(id, name, isPublic, order, createdAt, menus);
		this.menuCount = menus ? menus.length : 0;
	}
}

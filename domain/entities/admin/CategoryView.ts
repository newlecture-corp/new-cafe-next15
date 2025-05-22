import { Category } from "../Category";
import { Menu } from "../Menu";

export class CategoryView extends Category {
	constructor(
		id?: number,
		name?: string,
		isPublic: boolean = true,
		order: number = 0,
		createdAt?: Date,

		// View로 확장된 속성
		public menuCount: number = 0,

		// Relationship 속성
		menus?: Menu[]
	) {
		super(id, name, isPublic, order, createdAt, menus);
		this.menuCount = menus ? menus.length : 0;
	}
}

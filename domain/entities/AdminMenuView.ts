import { Menu } from "./Menu";

export class AdminMenuView extends Menu {
	constructor(
		id: number,
		korName: string,
		engName: string,
		price: number,
		categoryId: number,
		createdAt: Date,
		updatedAt: Date,
		description?: string,
		public defaultImage?: string // 대표 이미지 하나
	) {
		super(
			id,
			korName,
			engName,
			price,
			categoryId,
			createdAt,
			updatedAt,
			description
		);
	}
}

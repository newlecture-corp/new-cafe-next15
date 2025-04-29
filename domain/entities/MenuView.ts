import { Menu } from "./Menu";

export class MenuView extends Menu {
	constructor(
		id: number,
		korName: string,
		engName: string,
		price: number,
		categoryId: number,
		createdAt: Date,
		updatedAt: Date,
		description: string | undefined,
		// 추가된 속성들
		public defaultImage: string,
		public likeCount: number,
		public likedByMe: boolean
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

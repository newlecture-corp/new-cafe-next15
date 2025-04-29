// import { MenuImage } from "./MenuImage";

export class MenuDto {
	constructor(
		public id?: number,
		public korName?: string,
		public engName?: string,
		public price?: number,
		public createdAt?: Date,
		public categoryId?: number,
		public regMemberId?: string,
		public description?: string | null,
		// 대표 이미지 하나
		public defaultImage?: string | null,
		public likeCount?: number,
		public likeByMe?: boolean
	) {}
}

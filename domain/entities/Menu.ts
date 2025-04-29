import { Image } from "./Image";

export class Menu {
	constructor(
		public id: number,
		public korName: string,
		public engName: string,
		public price: number,
		public categoryId: number,
		public createdAt: Date,
		public updatedAt: Date,
		public description?: string, // 기본값으로 undefined 설정

		public images?: Image[] // 이미지 배열 추가
	) {}
}

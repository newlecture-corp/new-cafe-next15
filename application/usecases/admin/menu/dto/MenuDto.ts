import { MenuImageDto } from "./MenuImageDto";

export class MenuDto {
	constructor(
		public id: number,
		public korName: string,
		public engName: string,
		public price: number = 0,
		public description: string | "",
		public categoryId: number,
		public createdAt: Date,
		public updatedAt: Date,
		public defaultImage: string | null = null,

		public images: MenuImageDto[] = []
	) {}
}

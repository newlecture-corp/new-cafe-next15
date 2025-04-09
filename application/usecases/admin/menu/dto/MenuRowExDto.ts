import { Image } from "@/domain/entities/Image";

export class MenuRowExDto {
	constructor(
		public id: number,
		public engName: string,
		public price: number = 0,
		public createdAt: Date,

		public images: Image[] | []
	) {}
}

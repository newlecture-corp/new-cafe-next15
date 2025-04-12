export class ImageDto {
	constructor(
		public id: number,
		public name: string,
		public isDefault: boolean,
		public menuId: number
	) {}
}

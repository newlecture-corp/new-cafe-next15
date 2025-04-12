export class CategoryDto {
	constructor(
		public id?: number,
		public name?: string,
		public isPublic: boolean = false,
		public order: number = 0,
		public createdAt?: Date,
		public menuCount?: number
	) {}
}

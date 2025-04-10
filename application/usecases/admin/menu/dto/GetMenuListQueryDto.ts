export class GetMenuListQueryDto {
	constructor(
		public page?: number,
		public categoryId?: string,
		public searchWord?: string
	) {}
}

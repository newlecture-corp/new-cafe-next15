export class GetMenuListQueryDto {
	constructor(
		public page?: number,
		public categoryId?: string,
		public searchName?: string,
		public sortField?: string,
		public ascending?: boolean
	) {}
}

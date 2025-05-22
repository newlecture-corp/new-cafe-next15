export class GetMenuListQueryDto {
	constructor(
		public memberId?: string,
		public page?: number,
		public categoryId?: string,
		public searchName?: string,
		public sortField?: string,
		public ascending?: boolean
	) {}
}

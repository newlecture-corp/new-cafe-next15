export class GetCategoryListQueryDto {
	constructor(
		public page?: number,
		public name?: string,
		public includeAll?: boolean,
		public sortField?: string,
		public ascending?: boolean
	) {}
}

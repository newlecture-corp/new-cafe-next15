export class GetCategoryListQueryDto {
	constructor(
		public page?: number,
		public name?: string,
		public order?: boolean
	) {}
}

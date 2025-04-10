export class GetCategoryListQueryDto {
	constructor(
		public page?: number,
		public name?: string,
		public publicOnly?: boolean,
		public order?: boolean
	) {}
}

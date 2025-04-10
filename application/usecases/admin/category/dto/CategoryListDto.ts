import { CategoryDto } from "./CategoryDto";

export class CategoryListDto {
	constructor(
		public categories: CategoryDto[],

		public totalCount: number,
		public endPage: number,
		public pages: number[]
	) {}
}

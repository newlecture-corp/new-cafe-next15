export class MenuFilter {
	constructor(
		public searchWord?: string,
		public categoryId?: string,
		public offset: number = 0,
		public limit: number = 10
	) {}
}

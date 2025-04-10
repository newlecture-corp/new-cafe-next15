export class CategoryFilter {
	constructor(
		public name?: string,
		public publicOnly?: boolean,
		public order?: boolean,
		public offset: number = 0,
		public limit: number = 10
	) {}
}

export class AdminCategoryViewCriteria {
	constructor(
		public name?: string,
		public sortField?: string,
		public ascending?: boolean,
		public offset: number = 0,
		public limit: number = 10,
		public includeAll?: boolean,
		public includeMenu: boolean = false
	) {}
}

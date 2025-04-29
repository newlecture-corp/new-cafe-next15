export class MenuViewCriteria {
	constructor(
		public searchWord?: string,
		public categoryId?: string,
		public sortField: string = "created_at",
		public ascending: boolean = false,
		public includeAll: boolean = false,
		public offset: number = 0,
		public limit: number = 10
	) {}
}

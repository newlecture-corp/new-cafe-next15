export class MenuViewCriteria {
	constructor(
		public searchWord?: string,
		public categoryId?: string,
		public memberId?: string,
		public sortField: string = "createdAt",
		public ascending: boolean = false,
		public publicOnly: boolean = true,
		public offset: number = 0,
		public limit: number = 10
	) {}
}

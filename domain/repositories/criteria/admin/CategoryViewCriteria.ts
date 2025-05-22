export class CategoryViewCriteria {
	constructor(
		public name?: string,
		public sortField?: string,
		public ascending?: boolean,
		public offset: number = 0,
		public limit: number = 10,
		public includeAll?: boolean, // 비공개(isPublic=false) 데이터 포함
		public includeMenu: boolean = false
	) {}
}

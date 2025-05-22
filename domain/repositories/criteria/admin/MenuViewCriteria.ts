export class MenuViewCriteria {
	constructor(
		public searchWord?: string,
		public categoryId?: string,
		public sortField: string = "createdAt", // 정렬 필드(createdAt, name 등)
		public ascending: boolean = false,
		public includeAll: boolean = false, // 비공개(isPublic=false) 데이터 포함
		public offset: number = 0,
		public limit: number = 10
	) {}
}

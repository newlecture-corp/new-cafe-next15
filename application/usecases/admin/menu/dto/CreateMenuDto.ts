export class CreateMenuDto {
	constructor(
		public categoryId: number,
		public image: File | null,
		public korName: string,
		public engName: string,
		public price: number = 0,
		public regMemberId: string,
		public description?: string | ""
	) {}
}

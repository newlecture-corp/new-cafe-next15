export class CreateMenuDto {
	constructor(
		public categoryId: number,
		public korName: string,
		public engName: string,
		public price: number = 0,
		public regMemberId: string,
		public description?: string | ""
	) {}
}

export class CreatedMenuDto {
	constructor(
		public id: number,
		public korName: string,
		public engName: string,
		public price: number = 0,
		public description: string | "",
		public categoryId: number,
		public createdAt: Date,
		public deletedAt: Date,
		public updatedAt: Date
	) {}
}

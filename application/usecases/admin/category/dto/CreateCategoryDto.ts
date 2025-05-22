export class CreateCategoryDto {
	constructor(
		public name: string,
		public isPublic: boolean,
		public regMemberId: string
	) {}
}

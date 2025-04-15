export class SignedUpDto {
	constructor(
		public id: string,
		public username: string,
		public password: string,
		public email: string,
		public image?: string,
		public createdAt?: Date,
		public updatedAt?: Date,
		public deletedAt?: Date
	) {}
}

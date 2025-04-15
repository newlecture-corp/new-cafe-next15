export class SignUpDto {
	constructor(
		public username: string,
		public password: string,
		public email: string,
		public image?: File
	) {}
}

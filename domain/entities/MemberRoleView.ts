import { MemberRole } from "./MemberRole";

export class MemberRoleView extends MemberRole {
	constructor(
		memberId: number,
		roleId: number,
		createdAt: Date,
		public roleName: string
	) {
		super(memberId, roleId, createdAt);
	}
}

import { MemberRoleView } from "../entities/MemberRoleView";

export interface MemberRoleRepository {
	findAllByUsername(username: string): Promise<MemberRoleView[]>;
}

import { MemberRoleView } from "@/domain/entities/MemberRoleView";
import { MemberRoleRepository } from "@/domain/repositories/MemberRoleRepository";
import { createClient } from "@/utils/supabase/server";

export class SbMemberRoleRepository implements MemberRoleRepository {
	async findAllByUsername(username: string): Promise<MemberRoleView[]> {
		const supabase = await createClient();

		const { data, error } = await supabase
			.from("member_role_view")
			.select("*")
			.eq("username", username);

		if (error) {
			throw new Error(`Error fetching member roles: ${error.message}`);
		}

		return (
			data.map((entity) => ({
				memberId: entity.member_id,
				roleId: entity.role_id,
				createdAt: entity.created_at,
				roleName: entity.role_name,
			})) || []
		);
	}
}

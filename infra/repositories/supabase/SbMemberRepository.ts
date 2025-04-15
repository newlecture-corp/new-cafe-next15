import { Member } from "@/domain/entities/Memeber";
import { MemberRepository } from "@/domain/repositories/MemberRepository";
import { createClient } from "@/utils/supabase/server";

export class SbMemberRepository implements MemberRepository {
	async findAll(): Promise<Member[]> {
		return [] as Member[];
	}

	async findById(id: string): Promise<Member | null> {
		const supabase = await createClient();

		const { data, error } = await supabase
			.from("member")
			.select("*")
			.eq("id", id)
			.maybeSingle();

		if (error && error.code !== "PGRST116") {
			throw new Error(`Error fetching member by ID: ${error.message}`);
		}

		return data;
	}

	async findByUsername(username: string): Promise<Member | null> {
		const supabase = await createClient();

		const { data, error } = await supabase
			.from("member")
			.select("*")
			.eq("username", username)
			.maybeSingle();

		if (error && error.code !== "PGRST116") {
			throw new Error(`Error fetching member by username: ${error.message}`);
		}

		return {
			...data,
			createdAt: data.created_at,
		} as Member | null;
	}

	async update(member: Member): Promise<Member> {
		const supabase = await createClient();

		const { data, error } = await supabase
			.from("members")
			.update(member)
			.eq("id", member.id)
			.select()
			.maybeSingle();

		if (error) {
			throw new Error(`Error updating member: ${error.message}`);
		}

		if (!data) {
			throw new Error("Failed to retrieve updated member data.");
		}

		return data;
	}

	async save(member: Member): Promise<Member> {
		const supabase = await createClient();

		const { data, error } = await supabase
			.from("member")
			.insert({
				username: member.username,
				password: member.password,
				email: member.email,
			})
			.select()
			.maybeSingle();

		if (error) {
			throw new Error(`Error saving member: ${error.message}`);
		}

		if (!data) {
			throw new Error("Failed to retrieve saved member data.");
		}

		return data;
	}
}

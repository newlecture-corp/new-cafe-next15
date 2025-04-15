import { Role } from "@/domain/entities/Role";
import { RoleRepository } from "@/domain/repositories/RoleRepository";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export class SbRoleRepository implements RoleRepository {
	private supabase: SupabaseClient;

	constructor() {
		this.supabase = createClient(
			process.env.SUPABASE_URL || "",
			process.env.SUPABASE_KEY || ""
		);
	}

	async findById(id: number): Promise<Role | null> {
		const { data, error } = await this.supabase
			.from("roles")
			.select("*")
			.eq("id", id)
			.single();

		if (error) {
			console.error("Error fetching role by ID:", error);
			return null;
		}

		return data;
	}

	async findAll(): Promise<Role[]> {
		const { data, error } = await this.supabase.from("roles").select("*");

		if (error) {
			console.error("Error fetching all roles:", error);
			return [];
		}

		return data || [];
	}

	async create(role: Omit<Role, "id" | "created_at">): Promise<Role> {
		const { data, error } = await this.supabase
			.from("roles")
			.insert(role)
			.select()
			.single();

		if (error) {
			throw new Error("Error creating role: " + error.message);
		}

		return data!;
	}

	async update(role: Partial<Role>): Promise<Role | null> {
		if (!role.id) {
			throw new Error("Role ID is required for update.");
		}

		const { id, ...updateData } = role;

		const { data, error } = await this.supabase
			.from("roles")
			.update(updateData)
			.eq("id", id)
			.select()
			.single();

		if (error) {
			console.error("Error updating role:", error);
			return null;
		}

		return data;
	}

	async delete(id: number): Promise<boolean> {
		const { error } = await this.supabase.from("roles").delete().eq("id", id);

		if (error) {
			console.error("Error deleting role:", error);
			return false;
		}

		return true;
	}
}

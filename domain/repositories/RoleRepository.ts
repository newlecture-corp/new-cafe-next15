import { Role } from "../entities/Role";

export interface RoleRepository {
	findById(id: number): Promise<Role | null>;
	findAll(): Promise<Role[]>;
	create(role: Role): Promise<Role>;
	update(role: Partial<Role>): Promise<Role | null>;
	delete(id: number): Promise<boolean>;
}

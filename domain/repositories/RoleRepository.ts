// import { Role } from "../entities/Role";
// ***********************************
// 이 코드는 Prisma 엔티티를 이용하는 코드로 수정되었습니다.
// supabase를 사용하려면 위의 import 주석을 해제하고 아래의 코드를 주석 처리하세요.
// ***********************************
import { Role } from "@/prisma/generated";

export interface RoleRepository {
	findById(id: number): Promise<Role | null>;
	findAll(): Promise<Role[]>;
	create(role: Role): Promise<Role>;
	update(role: Partial<Role>): Promise<Role | null>;
	delete(id: number): Promise<boolean>;
}

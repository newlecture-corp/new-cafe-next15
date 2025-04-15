import { Member } from "../entities/Memeber";

export interface MemberRepository {
	findAll(): Promise<Member[]>;
	findById(id: string): Promise<Member | null>;
	findByUsername(username: string): Promise<Member | null>;
	update(member: Partial<Member>): Promise<Member>;
	save(member: Member): Promise<Member>;
}

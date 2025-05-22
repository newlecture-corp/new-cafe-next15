import { PrismaClient } from "@prisma/client";
import { Member } from "@/prisma/generated";
import { MemberRepository } from "@/domain/repositories/MemberRepository";

export class PrMemberRepository implements MemberRepository {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async findAll(): Promise<Member[]> {
		return await this.prisma.member.findMany();
	}

	async findById(id: string): Promise<Member | null> {
		return await this.prisma.member.findUnique({
			where: { id },
		});
	}

	async findByUsername(username: string): Promise<Member | null> {
		return await this.prisma.member.findUnique({
			where: { username },
		});
	}

	async update(member: Partial<Member>): Promise<Member> {
		if (!member.id) {
			throw new Error("Member ID is required for update.");
		}
		return await this.prisma.member.update({
			where: { id: member.id },
			data: member,
		});
	}

	async save(member: Member): Promise<Member> {
		return await this.prisma.member.create({
			data: member,
		});
	}
}

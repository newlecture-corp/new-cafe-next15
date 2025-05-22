import { CategoryRepository } from "@/domain/repositories/CategoryRepository";
import { Category } from "@/prisma/generated";
import { PrismaClient } from "@/prisma/generated";

export class PrCategoryRepository implements CategoryRepository {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async count(): Promise<number> {
		return this.prisma.category.count();
	}

	async findAll(): Promise<Category[]> {
		return this.prisma.category.findMany();
	}

	async findById(id: number): Promise<Category | null> {
		return this.prisma.category.findUnique({
			where: { id },
		});
	}
}

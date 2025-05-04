import { CategoryRepository } from "@/domain/repositories/CategoryRepository";
import { Category } from "@/prisma/generated";
import { PrismaClient } from "@prisma/client";

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

	async save(category: Category): Promise<Category> {
		return this.prisma.category.create({
			data: category,
		});
	}

	async update(category: Category): Promise<Category> {
		return this.prisma.category.update({
			where: { id: category.id },
			data: category,
		});
	}

	async deleteById(id: number): Promise<void> {
		await this.prisma.category.delete({
			where: { id },
		});
	}
}

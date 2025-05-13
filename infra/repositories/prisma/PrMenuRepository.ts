import { MenuRepository } from "@/domain/repositories/MenuRepository";
import { Menu, PrismaClient } from "@/prisma/generated";

export class PrMenuRepository implements MenuRepository {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async findById(id: number): Promise<Menu> {
		return (
			this.prisma.menu.findUniqueOrThrow({
				where: { id },
			}) || null
		);
	}

	async save(menu: Menu): Promise<Menu> {
		return this.prisma.menu.create({
			data: menu,
		});
	}

	async update(menu: Menu): Promise<Menu> {
		return this.prisma.menu.update({
			where: { id: menu.id },
			data: menu,
		});
	}

	async deleteById(id: number): Promise<void> {
		await this.prisma.menu.delete({
			where: { id },
		});
	}
}

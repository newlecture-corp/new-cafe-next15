import { MenuImageRepository } from "@/domain/repositories/admin/MenuImageRepository";
import { PrismaClient, MenuImage } from "@/prisma/generated";

export class PrMenuImageRepository implements MenuImageRepository {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient({
			// log: ["query"], // prisma가 생성한 쿼리를 콘솔에 출력하기 위한 옵션
		});
	}

	save(image: MenuImage): Promise<MenuImage | null> {
		return this.prisma.menuImage.create({
			data: image,
		});
	}

	async findAllByMenuId(menuId: number): Promise<MenuImage[]> {
		return this.prisma.menuImage.findMany({
			where: {
				menuId: menuId,
			},
		});
	}

	async findDefaultByMenuId(menuId: number): Promise<MenuImage | null> {
		return this.prisma.menuImage.findFirst({
			where: {
				menuId: menuId,
				isDefault: true,
			},
		});
	}
}

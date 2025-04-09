import { MenuRowExDto } from "./dto/MenuRowExDto";
import { MenuRepository } from "@/domain/repositories/MenuRepository";
import { Menu } from "@/domain/entities/Menu";
import { ImageRepository } from "@/domain/repositories/ImageRepository";

export class GetMenuRowExUsecase {
	constructor(
		private menuRepository: MenuRepository,
		private imageRepository: ImageRepository
	) {}

	async execute(menuId: string): Promise<MenuRowExDto> {
		const menu: Menu = await this.menuRepository.findById(Number(menuId));
		const images = await this.imageRepository.findAllByMenuId(Number(menuId));

		if (!menu) {
			throw new Error("Menu not found");
		}

		return {
			id: menu.id,
			engName: menu.engName,
			price: menu.price,
			createdAt: menu.createdAt,
			images: images || [], // Ensure images is always an array
		} as MenuRowExDto;
	}
}

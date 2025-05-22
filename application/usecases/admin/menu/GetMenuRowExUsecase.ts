import { MenuRepository } from "@/domain/repositories/admin/MenuRepository";
import { MenuRowExDto } from "./dto/MenuRowExDto";

import { Menu, MenuImage } from "@/prisma/generated";

export class GetMenuRowExUsecase {
	constructor(private adminMenuRepository: MenuRepository) {}

	async execute(menuId: string): Promise<MenuRowExDto> {
		// 1. 사용자가 입력한 값에 해당하는 데이터를 쿼리하고
		const menu: Menu | null = await this.adminMenuRepository.findByIdWithImages(
			Number(menuId)
		);

		// 2. 쿼리 결과가 없을 경우는 예외를 발생시키고
		if (!menu) {
			throw new Error("Menu not found");
		}

		// 3. 메뉴가 존재하는 경우는 MenuRowExDto로 변환하여 Menu 객체를 반환한다.
		return {
			id: menu.id,
			engName: menu.engName,
			price: menu.price,
			createdAt: menu.createdAt,
			// 📝 노트 : Prisma에서 반환된 객체는 관계형 데이터를 포함할 경우,
			// TypeScript가 해당 관계 데이터의 타입을 정확히 추론하지 못할 수 있다.
			// 따라서, 'as Menu & { images: MenuImage[] }'를 사용하여
			// images 속성이 MenuImage[] 타입임을 명시적으로 캐스팅한다.
			// ⚠️ 주의: 이는 TypeScript에게 타입을 강제로 지정하는 것이며,
			// 실제 데이터가 이 타입과 일치하지 않으면 런타임 에러가 발생할 수 있습니다.
			images: (menu as Menu & { images: MenuImage[] }).images || [],
		} as MenuRowExDto;
	}
}

import { MenuImageRepository } from "@/domain/repositories/MenuImageRepository";
import { ImageDto } from "./dto/ImageDto";
import { MenuImage } from "@/prisma/generated";

export class GetMenuImageListUsecase {
	private menuImageRepository: MenuImageRepository;

	constructor(menuImageRepository: MenuImageRepository) {
		this.menuImageRepository = menuImageRepository;
	}

	async execute(menuId: number): Promise<ImageDto[]> {
		// 1. 사용자가 입력한 값에 해당하는 데이터를 쿼리하고
		const images: MenuImage[] = await this.menuImageRepository.findAllByMenuId(
			menuId
		);

		// 2. 쿼리 결과가 없을 경우는 예외를 발생시키고
		if (!images) {
			throw new Error("Menu not found");
		}

		// 3. 메뉴가 존재하는 경우는 ImageDto로 변환하여 Menu 객체를 반환한다.
		return images.map((image: MenuImage) => ({
			...image,
		})) as ImageDto[];
	}
}

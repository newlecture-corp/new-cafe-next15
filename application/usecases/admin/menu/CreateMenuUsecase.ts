import { Menu, MenuImage } from "@/prisma/generated";
import { CreateMenuDto } from "./dto/CreateMenuDto";
import { CreatedMenuDto } from "./dto/CreatedMenuDto";
import { MenuRepository } from "@/domain/repositories/admin/MenuRepository";
import { LocalFileRepository } from "@/infra/repositories/LocalFileRepository";
import { MenuImageRepository } from "@/domain/repositories/admin/MenuImageRepository";

export class CreateMenuUsecase {
	constructor(
		private readonly menuRepository: MenuRepository,
		private readonly menuImageRepository: MenuImageRepository,
		private readonly FileRepository: LocalFileRepository
	) {}

	async execute(createMenuDto: CreateMenuDto): Promise<CreatedMenuDto> {
		// 1. 데이터 쿼리를 위해 사용자가 입력한 값을 Partial<Menu> 타입으로 변환하고
		const menu: Partial<Menu> = {
			korName: createMenuDto.korName,
			engName: createMenuDto.engName,
			price: createMenuDto.price,
			description: createMenuDto.description,
			categoryId: createMenuDto.categoryId,
			regMemberId: String(createMenuDto.regMemberId),
		};

		console.log("--- CreateMenuUsecase.execute ---");
		console.log("createMenuDto:", createMenuDto);
		console.log("---------------------------------");

		// 2. 데이터를 저장하는 쿼리를 실행하고
		const createdMenu: Menu = await this.menuRepository.save(menu as Menu);

		// 3. 이미지가 있다면 파일 저장소에 이미지를 저장한다.
		let savedFileName: string | undefined;
		{
			if (createMenuDto.image?.name) {
				savedFileName = await this.FileRepository.save(createMenuDto.image);
			}

			// 확인용 log 출력
			console.log("--- CreateMenuUsecase.execute ---");
			console.log("savedFileName:", savedFileName);
		}

		// 4. 이미지 파일이 디스크에 저장되었다면, 데이터베이스에도 저장한다.
		if (savedFileName) {
			// MenuImageRepository를 사용하여 이미지 정보를 저장한다.
			await this.menuImageRepository.save({
				name: savedFileName,
				isDefault: true,
				menuId: createdMenu.id,
			} as MenuImage);
		}

		// ================== CreateMenuUsecase.execute ==================
		// console.log("createdMenu:", createdMenu);
		// ==============================================================

		// 3. 새로 저장한 데이터의 식별자를 포함하는 Menu객체를 CreatedMenuDto로 변환하여 반환한다.
		const createdMenuDto: CreatedMenuDto = {
			...createdMenu,
			defaultImage: savedFileName ?? "default.png", // 첫 번째 이미지 URL을 기본 이미지로 설정
		} as CreatedMenuDto;

		return createdMenuDto;
	}
}

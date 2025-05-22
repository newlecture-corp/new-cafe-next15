import { MenuRepository } from "@/domain/repositories/MenuRepository";
import { Menu } from "@/prisma/generated";
import { CreateMenuDto } from "./dto/CreateMenuDto";
import { CreatedMenuDto } from "./dto/CreatedMenuDto";

export class CreateMenuUsecase {
	constructor(private readonly menuRepository: MenuRepository) {}

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

		// 2. 데이터를 저장하는 쿼리를 실행하고
		const createdMenu: Menu = await this.menuRepository.save(menu as Menu);

		// 확인용 log 출력
		// console.log("========= CreateMenuUsecase.execute =======");
		// console.log("createdMenu", createdMenu);
		// console.log("=============================================");

		// 3. 새로 저장한 데이터의 식별자를 포함하는 Menu객체를 CreatedMenuDto로 변환하여 반환한다.
		const createdMenuDto: CreatedMenuDto = {
			...createdMenu,
		} as CreatedMenuDto;

		return createdMenuDto;
	}
}

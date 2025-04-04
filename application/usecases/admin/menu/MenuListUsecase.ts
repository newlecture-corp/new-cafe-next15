import { MenuRepository } from "@/domain/repositories/MenuRepository";
import { MenuListDto } from "./dto/MenuListDto";

export default class MenuListUsecase {
    private menuRepository: MenuRepository; // Add type definition for menuRepository

    constructor(menuRepository: MenuRepository) {
        this.menuRepository = menuRepository;
    }

    async execute() {
        try {
            const menus = await this.menuRepository.findAll();

            const menuListDto:MenuListDto = {
                menus: menus.map(menu => ({
                    id: menu.id,
                    korName: menu.korName,
                    engName: menu.engName
                })),
                totalCount: menus.length,
                totalPages: 1, // Assuming all menus fit on one page for simplicity
                hasPreviousPage: false,
                hasNextPage: false,
                pages: [1], // Assuming all menus fit on one page for simplicity
            };

            return menuListDto;
        } catch (error) {
            console.error('Error fetching menus:', error);
            throw new Error('Failed to fetch menus');
        }
    }
}
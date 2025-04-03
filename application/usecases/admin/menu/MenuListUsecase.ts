import { MenuRepository } from "@/domain/repositories/MenuRepository";

export default class MenuListUsecase {
    private menuRepository: MenuRepository; // Add type definition for menuRepository

    constructor(menuRepository: MenuRepository) {
        this.menuRepository = menuRepository;
    }

    async execute() {
        try {
            const menus = await this.menuRepository.findAll();
            return menus;
        } catch (error) {
            console.error('Error fetching menus:', error);
            throw new Error('Failed to fetch menus');
        }
    }
}
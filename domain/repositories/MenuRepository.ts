import { Menu } from "../entities/Menu";

export interface MenuRepository {
	findById(id: number): Promise<Menu>;
	save(menu: Menu): Promise<Menu>;
}

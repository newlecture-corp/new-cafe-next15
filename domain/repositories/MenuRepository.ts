import { Menu } from "../entities/Menu";
import { MenuFilter } from "./filters/MenuFilter";

export interface MenuRepository {
	count(fileter: MenuFilter): Promise<number>;
	findById(id: number): Promise<Menu>;
	findAll(filter: MenuFilter): Promise<Menu[]>;
	save(menu: Menu): Promise<Menu>;
}

import { MenuView } from "../entities/MenuView";
import { MenuViewCriteria } from "./criteria/MenuViewCriteria";

export interface MenuViewRepository {
	count(criteria: MenuViewCriteria): Promise<number>;
	findAll(criteria: MenuViewCriteria): Promise<MenuView[]>;
}

import { Menu } from "@/prisma/generated";
import { MenuViewCriteria } from "../criteria/admin/MenuViewCriteria";
import { MenuView } from "../../entities/admin/MenuView";

export interface MenuRepository {
	// 집계 메소드들
	count(criteria?: MenuViewCriteria): Promise<number>;

	// 조회 메소드들
	findViewAll(criteria?: MenuViewCriteria): Promise<MenuView[]>;
	findByIdWithImages(id: number): Promise<Menu | null>;

	// 조작 메소드들
	save(menu: Menu): Promise<Menu>;
	update(menu: Menu): Promise<Menu>;
	deleteById(id: number): Promise<void>;
}

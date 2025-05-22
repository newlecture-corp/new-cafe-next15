// import { Menu } from "../entities/Menu";
// ***********************************
// 이 코드는 Prisma 엔티티를 이용하는 코드로 수정되었습니다.
// supabase를 사용하려면 위의 import 주석을 해제하고 아래의 코드를 주석 처리하세요.
// ***********************************
import { Menu } from "@/prisma/generated";
import { MenuView } from "../entities/MenuView";
import { MenuViewCriteria } from "./criteria/MenuViewCriteria";

export interface MenuRepository {
	// 집계 메소드들
	count(criteria: MenuViewCriteria): Promise<number>;

	// 조회 메소드들
	findAll(criteria: MenuViewCriteria): Promise<MenuView[]>;
	findByIdWithImages(id: number): Promise<Menu>;
	findById(id: number): Promise<Menu>;

	// 조작 메소드들
}

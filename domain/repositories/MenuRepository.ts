// import { Menu } from "../entities/Menu";
// ***********************************
// 이 코드는 Prisma 엔티티를 이용하는 코드로 수정되었습니다.
// supabase를 사용하려면 위의 import 주석을 해제하고 아래의 코드를 주석 처리하세요.
// ***********************************
import { Menu } from "@/prisma/generated";

export interface MenuRepository {
	findById(id: number): Promise<Menu>;
	save(menu: Menu): Promise<Menu>;
}

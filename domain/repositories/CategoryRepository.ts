// import { Category } from "../entities/Category";
// ***********************************
// 이 코드는 Prisma 엔티티를 이용하는 코드로 수정되었습니다.
// supabase를 사용하려면 위의 import 주석을 해제하고 아래의 코드를 주석 처리하세요.
// ***********************************
import { Category } from "@/prisma/generated";

export interface CategoryRepository {
	count(): Promise<number>;
	findAll(): Promise<Category[]>;
	findById(id: number): Promise<Category | null>;
	save(category: Category): Promise<Category>;
	update(category: Category): Promise<Category>;
	deleteById(id: number): Promise<void>;
}

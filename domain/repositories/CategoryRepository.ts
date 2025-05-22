// import { Category } from "../entities/Category";
// ***********************************
// 이 코드는 Prisma 엔티티를 이용하는 코드로 수정되었습니다.
// supabase를 사용하려면 위의 import 주석을 해제하고 아래의 코드를 주석 처리하세요.
// ***********************************
import { Category } from "@/prisma/generated";

export interface CategoryRepository {
	// 집계 메소드들
	count(): Promise<number>;

	// 조회 메소드들
	findAll(): Promise<Category[]>;
	findById(id: number): Promise<Category | null>;

	// 조작 메소드들
}

// ***********************************
// 이 코드는 Prisma 엔티티를 이용하는 코드로 수정되었습니다.
// ***********************************

import { CategoryView } from "@/domain/entities/admin/CategoryView";
import { CategoryViewCriteria } from "../criteria/admin/CategoryViewCriteria";
import { Category } from "@/prisma/generated";

export interface CategoryRepository {
	// 집계 메소드들
	count(criteria?: CategoryViewCriteria): Promise<number>;

	// 조회 메소드들
	findViewAll(criteria?: CategoryViewCriteria): Promise<CategoryView[]>;
	findById(id: number): Promise<Category | null>;

	// 조작 메소드들
	save(category: Category): Promise<Category>;
	update(category: Category): Promise<Category>;
	deleteById(id: number): Promise<void>;
}

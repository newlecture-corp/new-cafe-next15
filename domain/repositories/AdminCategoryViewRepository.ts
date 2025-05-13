import { AdminCategoryView } from "../entities/AdminCategoryView";
import { AdminCategoryViewCriteria } from "./criteria/AdminCategoryViewCriteria";

// ***********************************
// 이 코드는 Prisma 엔티티를 이용하는 코드로 수정되었습니다.
// ***********************************

export interface AdminCategoryViewRepository {
	count(criteria?: AdminCategoryViewCriteria): Promise<number>;
	findAll(criteria?: AdminCategoryViewCriteria): Promise<AdminCategoryView[]>;
}

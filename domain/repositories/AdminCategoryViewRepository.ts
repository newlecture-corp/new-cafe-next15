import { AdminCategoryView } from "../entities/AdminCategoryView";
import { AdminCategoryViewCriteria } from "./criteria/AdminCategoryViewCriteria";

export interface AdminCategoryViewRepository {
	count(criteria?: AdminCategoryViewCriteria): Promise<number>;
	findAll(criteria?: AdminCategoryViewCriteria): Promise<AdminCategoryView[]>;
}

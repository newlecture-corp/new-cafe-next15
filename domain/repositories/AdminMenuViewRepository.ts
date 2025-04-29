import { AdminMenuView } from "../entities/AdminMenuView";
import { AdminMenuViewCriteria } from "./criteria/AdminMenuViewCriteria";

export interface AdminMenuViewRepository {
	count(criteria?: AdminMenuViewCriteria): Promise<number>;
	findAll(criteria?: AdminMenuViewCriteria): Promise<AdminMenuView[]>;
}

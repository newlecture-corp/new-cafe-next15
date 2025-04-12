import { Category } from "./Category";

export class CategoryView extends Category {
	constructor(public menuCount: number = 0) {
		super();
	}
}

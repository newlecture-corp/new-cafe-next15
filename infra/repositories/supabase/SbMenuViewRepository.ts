import { createClient } from "@/utils/supabase/server";

import { MenuViewCriteria } from "@/domain/repositories/criteria/MenuViewCriteria";
import { MenuView } from "@/domain/entities/MenuView";
import { MenuViewRepository } from "@/domain/repositories/MenuViewRepository";

export class SbMenuViewRepository implements MenuViewRepository {
	async count(criteria: MenuViewCriteria): Promise<number> {
		const supabase = await createClient();

		// Initialize the query for the "menu" table with exact count enabled
		/*
		// "menu_view" 테이블을 사용하여 공개된 카테고리를 가진 메뉴의 개수를 가져옵니다.
		let query = supabase
			.from("menu_view")
			.select("*", { count: "exact" })
			.eq("category_is_public", true);
		*/

		let query = supabase
			.from("menu")
			.select("*, category(is_public)", { count: "exact" })
			.eq("category.is_public", true);

		// Apply filters based on the MenuFilter object with AND logic
		if (criteria) {
			if (criteria.searchWord) {
				query = query.ilike("kor_name", `%${criteria.searchWord}%`);
			}

			if (criteria.categoryId) {
				query = query.eq("category_id", criteria.categoryId);
			}
		}

		// Execute the query and return the count
		const { count, error } = await query;

		if (error) {
			throw new Error(`Failed to count menus: ${error.message}`);
		}

		console.log("SbMenuViewRepository 메뉴 개수:", count); // 메뉴 개수를 콘솔에 출력

		return count || 0; // Return the count or 0 if no rows match
	}

	async findAll(filter: MenuViewCriteria): Promise<MenuView[]> {
		const supabase = await createClient();
		let query = supabase
			.from("menu")
			.select(
				`
				*,
				category (
				  is_public
				),
				image (
				  name,
				  is_default
				)
			  `
			)
			.eq("category.is_public", true)
			.eq("image.is_default", true)
			.order(filter.sortField || "created_at", {
				ascending: filter.ascending || false,
			})
			.range(
				filter.offset || 0,
				(filter.offset || 0) + (filter.limit || 10) - 1
			);

		// Apply filters based on the MenuFilter object with AND logic
		if (filter) {
			if (filter.searchWord) {
				query = query.ilike("kor_name", `%${filter.searchWord}%`);
			}

			if (filter.categoryId) {
				query = query.eq("category_id", filter.categoryId);
			}
		}

		const { data } = await query;

		// console.log("SbMenuViewRepository : ------------------"); // 메뉴 데이터를 콘솔에 출력
		// console.log("SbMenuViewRepository : 메뉴 데이터:", data); // 메뉴 데이터를 콘솔에 출력
		// console.log("SbMenuViewRepository : ------------------"); // 메뉴 데이터를 콘솔에 출력

		const menuViews: MenuView[] =
			data
				?.filter((m) => m.category !== null)
				.map((m) => {
					console.log("메뉴 데이터:", m); // 메뉴 데이터를 콘솔에 출력
					return {
						id: m.id,
						korName: m.kor_name,
						engName: m.eng_name,
						price: m.price,
						categoryId: m.category_id,
						createdAt: m.created_at,
						updatedAt: m.updated_at,
						description: m.description,
						defaultImage: m.image.length > 0 ? m.image[0].name : "",
						likeCount: 0,
						likedByMe: false,
					};
				}) || [];

		return menuViews;
	}
}

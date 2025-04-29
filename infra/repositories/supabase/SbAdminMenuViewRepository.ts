import { createClient } from "@/utils/supabase/server";

import { MenuViewCriteria } from "@/domain/repositories/criteria/MenuViewCriteria";
import { AdminMenuViewRepository } from "@/domain/repositories/AdminMenuViewRepository";
import { AdminMenuView } from "@/domain/entities/AdminMenuView";

export class SbAdminMenuViewRepository implements AdminMenuViewRepository {
	async count(criteria: MenuViewCriteria): Promise<number> {
		const supabase = await createClient();

		let query = supabase
			.from("menu")
			.select("*, category(is_public)", { count: "exact" })
			.eq("category.is_public", true);

		if (criteria) {
			if (criteria.searchWord) {
				query = query.ilike("kor_name", `%${criteria.searchWord}%`);
			}

			if (criteria.categoryId) {
				query = query.eq("category_id", criteria.categoryId);
			}
		}

		const { count, error } = await query;
		if (error) {
			throw new Error(`Failed to count menus: ${error.message}`);
		}

		return count || 0; // Return the count or 0 if no rows match
	}

	async findAll(filter: MenuViewCriteria): Promise<AdminMenuView[]> {
		const supabase = await createClient();
		let query = supabase
			.from("menu")
			.select("*, category(is_public), image(id,name,is_default)", {
				count: "exact",
			})
			.eq("category.is_public", true) // Include only parent entities set to public
			// .eq("image.is_default", true) // Add filter for default images
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

		// 확인용 log 출력
		// console.log("--- menuListUsecase.execute ---");
		// console.log("메뉴 개수:", data?.length); // 메뉴 개수를 콘솔에 출력
		// console.log("메뉴 목록:", data); // 메뉴 목록을 콘솔에 출력

		const menuViews: AdminMenuView[] =
			data
				?.filter((m) => m.category !== null)
				.map((m) => {
					const defaultImage =
						m.image.find(
							(img: { is_default: boolean; name: string }) => img.is_default
						)?.name || null; // is_default가 true인 이미지를 찾음

					return {
						id: m.id,
						korName: m.kor_name,
						engName: m.eng_name,
						price: m.price,
						categoryId: m.category_id,
						createdAt: m.created_at,
						updatedAt: m.updated_at,
						description: m.description,
						defaultImage, // 기본 이미지를 설정
						images: m.image,
					};
				}) || [];

		return menuViews;
	}
}

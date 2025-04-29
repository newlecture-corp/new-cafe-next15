import { AdminCategoryView } from "@/domain/entities/AdminCategoryView";

import { AdminCategoryViewCriteria } from "@/domain/repositories/criteria/AdminCategoryViewCriteria";
import { createClient } from "@/utils/supabase/server";

export class SbAdminCategoryViewRepository
	implements SbAdminCategoryViewRepository
{
	async count(filter?: AdminCategoryViewCriteria): Promise<number> {
		const supabase = await createClient();

		let query = supabase
			.from("category")
			.select("*", { count: "exact", head: true });

		if (filter) {
			const orConditions: string[] = [];

			if (filter.name) {
				orConditions.push(`name.ilike.%${filter.name}%`);
			}

			if (filter.includeAll === false) {
				orConditions.push(`is_public.eq.true`);
			}

			if (orConditions.length > 0) {
				query = query.or(orConditions.join(","));
			}
		}

		const { count, error } = await query;

		if (error) {
			throw new Error(`Failed to count categories: ${error.message}`);
		}

		return count || 0;
	}

	async findAll(
		filter?: AdminCategoryViewCriteria
	): Promise<AdminCategoryView[]> {
		const supabase = await createClient();

		console.log(filter);

		let query = supabase
			.from("category_view")
			.select("*")
			.eq("is_public", true)
			.order("menu_count", { ascending: true });

		if (filter) {
			const orConditions: string[] = [];

			if (filter.includeMenu) {
				query = supabase.from("category_view").select("*");
				// .select("*, menus:menu(*), menu (count)");
			}

			if (filter.name) orConditions.push(`name.ilike.%${filter.name}%`);

			if (filter.includeAll === false) orConditions.push(`is_public.eq.true`);

			if (orConditions.length > 0) query = query.or(orConditions.join(","));

			if (filter.sortField !== undefined)
				query = query.order(filter.sortField, { ascending: filter.ascending });
			else query = query.order("order", { ascending: false });

			query = query.range(filter.offset, filter.offset + filter.limit - 1);
		}

		const { data, error } = await query;

		if (error) {
			throw new Error(`Failed to fetch categories: ${error.message}`);
		}

		return data.map((category) => {
			return {
				...category,
				isPublic: category.is_public,
				createdAt: category.created_at,
				menuCount: category.menu_count,
			} as AdminCategoryView;
		});
	}
}

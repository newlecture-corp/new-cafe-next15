import { createClient } from "@/utils/supabase/server";

import { Menu } from "../../../domain/entities/Menu";
import { MenuRepository } from "../../../domain/repositories/MenuRepository";
import { MenuFilter } from "@/domain/repositories/filters/MenuFilter";

export class SbMenuRepository implements MenuRepository {
	async count(filter: MenuFilter): Promise<number> {
		const supabase = await createClient();

		// Initialize the query for the "menu" table with exact count enabled
		let query = supabase
			.from("menu_view")
			.select("*", { count: "exact" })
			.eq("category_is_public", true);

		// Apply filters based on the MenuFilter object with AND logic
		if (filter) {
			if (filter.searchWord) {
				query = query.ilike("kor_name", `%${filter.searchWord}%`);
			}

			if (filter.categoryId) {
				query = query.eq("category_id", filter.categoryId);
			}
		}

		// Execute the query and return the count
		const { count, error } = await query;
		if (error) {
			throw new Error(`Failed to count menus: ${error.message}`);
		}

		return count || 0; // Return the count or 0 if no rows match
	}

	async findById(id: number): Promise<Menu> {
		const supabase = await createClient();

		// Fetch a menu by ID from the "menu" table
		const { data, error } = await supabase
			.from("menu")
			.select()
			.eq("id", id)
			.single();

		if (error) {
			throw new Error(`Failed to fetch menu by ID: ${error.message}`);
		}

		// Return the fetched menu
		return {
			id: data.id,
			korName: data.kor_name,
			engName: data.eng_name,
			price: data.price,
			description: data.description,
			categoryId: data.category_id,
			createdAt: data.created_at,
			updatedAt: data.updated_at,
		};
	}

	async findAll(filter: MenuFilter): Promise<Menu[]> {
		const supabase = await createClient();
		let query = supabase
			.from("menu_view")
			.select("*")
			.eq("category_is_public", true) // 공개로 설정된 부모 엔티티만 포함
			.order("created_at", { ascending: false })
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

		console.log("Fetched menus:", data); // Log the fetched menus

		const menus: Menu[] =
			data
				?.filter((m) => m.category !== null)
				.map((m) => ({
					id: m.id,
					korName: m.kor_name,
					engName: m.eng_name,
					price: m.price,
					description: m.description,
					categoryId: m.category_id,
					createdAt: m.created_at,
					updatedAt: m.updated_at,
				})) || [];

		return menus;
	}

	async save(menu: Menu): Promise<Menu> {
		const supabase = await createClient();

		// Insert the menu into the "menu" table
		const { data, error } = await supabase
			.from("menu")
			.insert({
				kor_name: menu.korName,
				eng_name: menu.engName,
				price: menu.price,
				description: menu.description,
			})
			.select()
			.single();

		if (error) {
			throw new Error(`Failed to save menu: ${error.message}`);
		}

		// Return the saved menu
		return {
			id: data.id,
			korName: data.kor_name,
			engName: data.eng_name,
			price: data.price,
			categoryId: data.category_id,
			createdAt: data.created_at,
			updatedAt: data.updated_at,
			description: data.description,
		};
	}
}

import { createClient } from "@/utils/supabase/server";

import { Menu } from "../../../domain/entities/Menu";
import { MenuRepository } from "../../../domain/repositories/MenuRepository";

export class SbMenuRepository implements MenuRepository {
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

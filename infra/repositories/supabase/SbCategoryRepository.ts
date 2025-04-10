import { Category } from "@/domain/entities/Category";
import { CategoryFilter } from "@/domain/repositories/filters/CategoryFilter";
import { CategoryRepository } from "@/domain/repositories/CategoryRepository";
import { createClient } from "@/utils/supabase/server";

export class SbCategoryRepository implements CategoryRepository {
	async count(filter?: CategoryFilter): Promise<number> {
		const supabase = await createClient();

		let query = supabase
			.from("category")
			.select("*", { count: "exact", head: true });

		if (filter) {
			const orConditions: string[] = [];

			if (filter.name) {
				orConditions.push(`name.ilike.%${filter.name}%`);
			}
			if (filter.publicOnly === true) {
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

	async findAll(filter?: CategoryFilter): Promise<Category[]> {
		const supabase = await createClient();

		let query = supabase.from("category").select("*");

		if (filter) {
			const orConditions: string[] = [];

			if (filter.name) {
				orConditions.push(`name.ilike.%${filter.name}%`);
			}
			if (filter.publicOnly === true) {
				orConditions.push(`is_public.eq.true`);
			}

			if (orConditions.length > 0) {
				query = query.or(orConditions.join(","));
			}

			if (filter.order !== undefined) {
				query = query.order("order", { ascending: filter.order });
			}

			query = query.range(filter.offset, filter.offset + filter.limit - 1);
		} else {
			query = query.order("order", { ascending: true });
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
			} as Category;
		});
	}

	async findById(id: number): Promise<Category | null> {
		const supabase = await createClient();

		const { data, error } = await supabase
			.from("category")
			.select("*")
			.eq("id", id)
			.single();

		if (error) {
			throw new Error(
				`Failed to fetch category with id ${id}: ${error.message}`
			);
		}

		if (!data) {
			return null;
		}

		return {
			...data,
			isPublic: data.is_public,
			createdAt: data.created_at,
		} as Category;
	}

	async save(category: Category): Promise<Category> {
		const supabase = await createClient();

		const { data, error } = await supabase
			.from("category")
			.insert({
				name: category.name,
				is_public: category.isPublic,
				order: category.order,
			})
			.select()
			.single();

		if (error) {
			throw new Error(`Failed to save category: ${error.message}`);
		}

		return {
			...data,
			isPublic: data.is_public,
			createdAt: data.created_at,
		} as Category;
	}

	async update(category: Category): Promise<Category> {
		const supabase = await createClient();

		const updates: Partial<{
			name: string;
			is_public: boolean;
			order: number;
		}> = {};
		if (category.name !== undefined && category.name !== null) {
			updates.name = category.name;
		}
		if (category.isPublic !== undefined && category.isPublic !== null) {
			updates.is_public = category.isPublic;
		}
		if (category.order !== undefined && category.order !== null) {
			updates.order = category.order;
		}

		const { data, error } = await supabase
			.from("category")
			.update(updates)
			.eq("id", category.id)
			.select()
			.single();

		if (error) {
			throw new Error(
				`Failed to update category with id ${category.id}: ${error.message}`
			);
		}

		return {
			...data,
			isPublic: data.is_public,
			createdAt: data.created_at,
		} as Category;
	}

	async delete(id: number): Promise<void> {
		const supabase = await createClient();

		const { error } = await supabase.from("category").delete().eq("id", id);

		if (error) {
			throw new Error(
				`Failed to delete category with id ${id}: ${error.message}`
			);
		}
	}
}

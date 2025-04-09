import { ImageRepository } from "@/domain/repositories/ImageRepository";
import { Image } from "../../../domain/entities/Image";
import { createClient } from "@/utils/supabase/server";

export class SbImageRepository implements ImageRepository {
	async findAllByMenuId(menuId: number): Promise<Image[]> {
		const supabase = await createClient();

		const { data, error } = await supabase
			.from("image")
			.select("*")
			.eq("menu_id", menuId);

		if (error) {
			throw new Error(`Error fetching images: ${error.message}`);
		}

		return (
			data.map((item) => ({
				id: item.id,
				name: item.name,
				isDefault: item.is_default,
				menuId: item.menu_id,
			})) || []
		);
	}

	async findDefaultByMenuId(menuId: number): Promise<Image | null> {
		const supabase = await createClient();
		const { data, error } = await supabase
			.from("image")
			.select("*")
			.eq("menu_id", menuId)
			.eq("is_default", true)
			.maybeSingle();

		if (error) {
			throw new Error(`Error fetching default image: ${error.message}`);
		}

		return data
			? {
					id: data.id,
					name: data.name, // Ensure 'name' is included
					isDefault: data.is_default,
					menuId: data.menu_id,
			  }
			: null;
	}
}

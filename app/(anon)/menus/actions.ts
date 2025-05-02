"use server";

import { redirect } from "next/navigation";

export async function toggleLike(formData: FormData) {
	console.log(formData.get("menu-id"));

	redirect("/menus");
}

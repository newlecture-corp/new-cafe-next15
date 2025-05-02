"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function login(formData: FormData) {
	const username = formData.get("username") as string;
	const password = formData.get("password") as string;

	console.log("username", username);
	console.log("password", password);

	const userCookies = await cookies();
	userCookies.set("username", username, { path: "/menus" });

	redirect("/");
}

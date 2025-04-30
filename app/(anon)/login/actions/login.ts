"use server";

// import { redirect } from "next/navigation";
// import { cookies } from "next/headers";

export async function login(formData: FormData) {
	console.log(formData.get("username"));
	console.log(formData.get("password"));

	// const username = formData.get("username");
	// if (typeof username === "string") {
	// 	cookies().set("username", username, { path: "/", httpOnly: false });
	// }

	// redirect("/");
}

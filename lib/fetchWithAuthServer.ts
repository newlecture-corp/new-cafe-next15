import { cookies } from "next/headers";

export async function fetchWithAuthServer(
	url: string,
	options: RequestInit = {}
): Promise<Response> {
	const cookieStore = await cookies();
	const sessionToken = cookieStore.get("next-auth.session-token");

	console.log("sessionToken", sessionToken);

	const res = await fetch(url, {
		...options,
		headers: {
			...options.headers,
			Authorization: `Bearer ${sessionToken?.value}`,
		},
	});

	return res;
	// const data: unknown = await res.json();
	// return data;
}

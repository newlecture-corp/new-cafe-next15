export async function fetchWithAuthClient(
	url: string,
	options: RequestInit = {}
): Promise<Response> {
	// Extract the session token from document.cookie
	const cookies = document.cookie
		.split("; ")
		.find((row) => row.startsWith("next-auth.session-token="));
	const sessionToken = cookies?.split("=")[1];

	console.log("sessionToken", sessionToken);

	const res = await fetch(url, {
		...options,
		headers: {
			...options.headers,
			Authorization: `Bearer ${sessionToken}`,
		},
	});

	return res;
}

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	console.log("middleware", pathname);

	// 인증이 필요한 경로만 제한
	const isMemberPage = pathname.startsWith("/member");
	const isAdminPage = pathname.startsWith("/admin");
	const isApiMember = pathname.startsWith("/api/member");
	const isApiAdmin = pathname.startsWith("/api/admin");

	const isProtectedPage = isMemberPage || isAdminPage;
	const isProtectedApi = isApiMember || isApiAdmin;

	console.log("isProtectedPage", isProtectedPage);

	const token = await getToken({ req });

	// 페이지 보호
	if (isProtectedPage) {
		console.log("----------------------------------------");
		console.log("isProtectedPage", isProtectedPage);
		console.log("token", token);
		if (!token) {
			const loginUrl = new URL("/login", req.url);
			loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
			return NextResponse.redirect(loginUrl);
		}

		console.log("token", token);
		const expiryDate = new Date((token.exp as number) * 1000); // 초 → 밀리초로 변환
		console.log("⏰ Token expires at:", expiryDate.toISOString());

		if (isAdminPage && !token.roles?.includes("ADMIN")) {
			return NextResponse.rewrite(new URL("/error/403", req.url));
		}
	}

	// API 보호
	if (isProtectedApi) {
		if (!token) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		if (isApiAdmin && token?.roles?.includes("ADMIN")) {
			return NextResponse.json({ message: "Forbidden" }, { status: 403 });
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/member/:path*",
		"/admin/:path*",
		"/api/member/:path*",
		"/api/admin/:path*",
		"/member",
		"/admin",
	],
};

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

	if (!token) {
		console.log("Token not found. Checking sources:");
		const authHeader = req.headers.get("authorization");
		const hasAuthHeader = !!authHeader;
		const hasCookie =
			!!req.cookies.get("next-auth.session-token") ||
			!!req.cookies.get("__Secure-next-auth.session-token");

		console.log("Authorization Header Present:", hasAuthHeader);
		console.log("Session Cookie Present:", hasCookie);
	} else {
		console.log("Token found. Source:");
		if (req.headers.get("authorization")) {
			console.log("Found in Authorization Header");
		} else if (
			req.cookies.get("next-auth.session-token") ||
			req.cookies.get("__Secure-next-auth.session-token")
		) {
			console.log("Found in Session Cookie");
		} else {
			console.log("Source unknown");
		}
	}

	// 페이지 보호
	if (isProtectedPage) {
		if (!token) {
			const loginUrl = new URL("/login", req.url);
			loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
			return NextResponse.redirect(loginUrl);
		}

		// 토큰 정보 확인
		console.log("====== Token Info ====");

		console.log("🔐 Raw Token:", token);
		console.log("🔐 Token JSON:", JSON.stringify(token, null, 2));

		const expiryDate = new Date((token.exp as number) * 1000); // 초 → 밀리초로 변환
		console.log("⏰ Token expires at:", expiryDate.toISOString());

		if (isAdminPage && !token?.roles?.includes("ADMIN")) {
			return NextResponse.rewrite(new URL("/error/403", req.url));
		}
	}

	// API 보호
	if (isProtectedApi) {
		if (!token) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		if (isApiAdmin && !token?.roles?.includes("ADMIN")) {
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

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose"; // Edge Runtime 호환 라이브러리

export const config = {
	matcher: ["/api/admin/:path*", "/api/member/:path*"], // /api/admin/** 및 /api/member/** 경로에 미들웨어 적용
};

export async function middleware(req: NextRequest) {
	const authHeader = req.headers.get("authorization");
	const token = authHeader?.startsWith("Bearer ")
		? authHeader.slice(7)
		: authHeader;

	// console.log("==== Middelware Token: ===========", token);

	// 토큰이 없는 경우 401 Unauthorized 반환
	if (!token) {
		return NextResponse.json(
			{ error: "Unauthorized: No token provided" },
			{ status: 401 }
		);
	}

	try {
		// Verify the token using jose
		const secret = new TextEncoder().encode(process.env.JWT_SECRET);
		const { payload } = await jwtVerify(token, secret);
		// console.log("Decoded Payload:", payload);
		// roles 배열 확인
		const roles = payload.roles as string[] | undefined;
		if (!roles || !Array.isArray(roles)) {
			return NextResponse.json(
				{ error: "Forbidden: Invalid roles in token" },
				{ status: 403 }
			);
		}
		// 요청 경로에 따라 권한 검증
		const pathname = req.nextUrl.pathname;
		// /api/admin/** 경로는 ADMIN 역할만 접근 가능
		if (pathname.startsWith("/api/admin") && !roles.includes("ADMIN")) {
			return NextResponse.json(
				{ error: "Forbidden: You do not have access to this resource" },
				{ status: 403 }
			);
		}
		// /api/member/** 경로는 MEMBER 또는 ADMIN 역할만 접근 가능
		if (
			pathname.startsWith("/api/member") &&
			!roles.some((role) => ["MEMBER", "ADMIN"].includes(role))
		) {
			return NextResponse.json(
				{ error: "Forbidden: You do not have access to this resource" },
				{ status: 403 }
			);
		}
		// 	console.log("Verified Payload:", payload);
	} catch (error) {
		// 토큰이 유효하지 않은 경우 401 Unauthorized 반환
		console.error("Token validation error:", error);
		return NextResponse.json(
			{ error: "Unauthorized: Invalid token" },
			{ status: 401 }
		);
	}

	return NextResponse.next();
}

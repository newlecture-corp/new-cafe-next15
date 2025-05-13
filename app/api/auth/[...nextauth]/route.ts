// app/api/auth/[...nextauth]/route.ts

import NextAuth, { Session, User } from "next-auth"; // Session, User 임포트 확인
import { JWT } from "next-auth/jwt"; // JWT 임포트 확인
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const { username, password } = credentials ?? {};

				// 실제 DB 또는 API를 통한 사용자 인증 로직
				if (username === "newlec" && password === "1234") {
					return {
						id: "7ae5e5c9-0c28-426f-952f-85bdfdcfc522",
						username: "newlec", // User 타입에 username이 있어야 함
						roles: ["ADMIN", "MEMBER"], // User 타입에 roles가 있어야 함
					};
				}

				return null;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }: { token: JWT; user?: User }) {
			// user 타입은 자동으로 추론되거나 명시적으로 User 사용 가능
			if (user) {
				token.id = user.id;
				// user 객체에 username과 roles가 있다고 타입 정의를 통해 알려주었으므로 오류 해결
				token.username = user.username;
				token.roles = user.roles;
			}
			return token;
		},
		async session({ session, token }: { session: Session; token: JWT }) {
			// token 타입은 JWT, session 타입은 Session
			if (session.user) {
				// token 객체에 id, username, roles가 있다고 타입 정의를 통해 알려주었으므로 오류 해결
				session.user.id = token.id as string; // token.id는 string | undefined 일 수 있으므로 타입 단언 또는 확인
				session.user.username = token.username;
				session.user.roles = token.roles;
			}
			return session;
		},
	},
	pages: {
		signIn: "/login", // 커스텀 로그인 페이지 경로
	},
	session: {
		strategy: "jwt",
	},
	secret: process.env.AUTH_SECRET,
});

export { handler as GET, handler as POST };

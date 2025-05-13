import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			/** The user's unique identifier. */
			id: string;
			/** The user's username. */
			username?: string | null; // authorize에서 username을 반환하므로 추가
			/** The user's roles. */
			roles?: string[] | null; // authorize에서 roles를 반환하므로 추가
		} & DefaultSession["user"]; // 기존 name, email, image 등을 유지하기 위함
	}

	interface User extends DefaultUser {
		/** The user's username. */
		username?: string | null;
		/** The user's roles. */
		roles?: string[] | null;
	}
}

declare module "next-auth/jwt" {
	/** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
	interface JWT extends DefaultJWT {
		/** OpenID ID Token */
		id?: string; // authorize에서 id를 반환하므로 추가 (기존 sub와 별개로 사용 가능)
		username?: string | null;
		roles?: string[] | null;
	}
}

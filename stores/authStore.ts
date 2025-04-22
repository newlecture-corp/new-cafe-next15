// 상태 관리 설정 (Zustand)

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
	id: string | null; // 사용자 ID
	username: string | null; // 사용자 이름
	roles: string[]; // 사용자 역할
	token: string | null; // 사용자 토큰
	// 상태 업데이트 메서드
	setId: (id: string) => void; // 사용자 ID 설정
	setUsername: (username: string) => void; // 사용자 이름 설정
	setRoles: (roles: string[]) => void; // 사용자 역할 설정
	setToken: (token: string) => void; // 사용자 토큰 설정
	// 상태 초기화 메서드
	clearAuth: () => void; // 사용자 정보 초기화
	// 인증 여부 확인 메서드
	isAuthenticated: () => boolean; // 인증 여부 확인
	isRehydrated: boolean; // 상태 복원 여부
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			id: null,
			username: null,
			roles: [],
			token: null,
			// 상태 업데이트 메서드
			setToken: (token) => set({ token }),
			setUsername: (username) => set({ username }),
			setId: (id) => set({ id }),
			setRoles: (roles) => set({ roles }),
			// 상태 초기화 메서드
			clearAuth: () =>
				set({
					id: null,
					username: null,
					roles: [],
					token: null,
				}),
			// 인증 여부 확인 메서드
			isAuthenticated: () => !!get().token, // 토큰이 존재하면 인증된 상태
			isRehydrated: false,
		}),
		{
			name: "auth-storage", // 로컬 스토리지 키
			onRehydrateStorage: () => (state) => {
				if (state) {
					state.isRehydrated = true; // 상태 복원 완료 플래그 설정
				}
			},
		} // LocalStorage 키 이름
	)
);

"use client";

import { usePathname, useRouter } from "next/navigation";
import AdminAside from "./components/AdminAside";
import AdminFooter from "./components/AdminFooter";
import AdminHeader from "./components/AdminHeader";
import { useEffect, useLayoutEffect, useState } from "react";
import { useAuthStore } from "@/stores/authStore";

// 레이아웃 스크립트 초기화
import { initLayout } from "newtil-css";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const router = useRouter();
	const { isAuthenticated, roles, isRehydrated } = useAuthStore();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!isRehydrated) {
			// zustand 상태 복원이 완료되지 않았으면 로딩 상태 유지
			return;
		}
		setIsLoading(false); // Loading complete after login check
	}, [isRehydrated, isAuthenticated, roles, pathname, router]);

	useLayoutEffect(() => {
		initLayout(); // Initialize layout styles
		console.log(initLayout); // 확인용 로그
	}, []);

	if (isLoading) {
		return (
			<div className="n-layout">
				<p className="fs:14">Loading...</p>
			</div>
		);
	}

	return (
		<div className="n-layout layout-color:base-1">
			<AdminHeader />

			<AdminAside />
			{children}

			<AdminFooter />
		</div>
	);
}

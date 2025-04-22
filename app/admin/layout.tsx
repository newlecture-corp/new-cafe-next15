"use client";

import { usePathname, useRouter } from "next/navigation";
import AdminAside from "./components/AdminAside";
import AdminFooter from "./components/AdminFooter";
import AdminHeader from "./components/AdminHeader";
import { useEffect, useLayoutEffect, useState } from "react";
import { useAuthStore } from "@/stores/authStore";

import { initLayout } from "newtil-css"; // 수정된 패키지 이름

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

		if (!isAuthenticated()) {
			// Save the current URL to localStorage before redirecting
			localStorage.setItem("returnURL", pathname); // Use window.location.pathname for the current URL path
			router.push("/login"); // Redirect to login page
		} else if (!roles.includes("ADMIN")) {
			router.push("/error/403"); // Redirect to 403 error page if not admin
		} else {
			setIsLoading(false); // Loading complete after login check
		}
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
		<div className="n-layout">
			<AdminHeader />

			<AdminAside />
			{children}

			<AdminFooter />
		</div>
	);
}

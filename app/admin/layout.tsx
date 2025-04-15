"use client";

import { usePathname, useRouter } from "next/navigation";
import AdminAside from "./components/AdminAside";
import AdminFooter from "./components/AdminFooter";
import AdminHeader from "./components/AdminHeader";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/authStore";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const router = useRouter();
	const { isAuthenticated, roles } = useAuthStore();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!isAuthenticated()) {
			// Save the current URL to localStorage before redirecting
			localStorage.setItem("returnURL", pathname); // Use window.location.pathname for the current URL path
			router.push("/login"); // Redirect to login page
		} else if (!roles.includes("ADMIN")) {
			router.push("/error/403"); // Redirect to 403 error page if not admin
		} else {
			setIsLoading(false); // Loading complete after login check
		}
	}, []);

	if (isLoading) {
		return (
			<div className="d:flex jc:center ai:center h:full">
				<p className="fs:14">Loading...</p>
			</div>
		);
	}

	return (
		<div className="n-layout n-aside-size:full1 n-aside-float1 n-aside-pos:right1">
			<AdminHeader />
			<div className="xl:w:xlarge">
				<AdminAside />
				{children}
			</div>
			<AdminFooter />
		</div>
	);
}

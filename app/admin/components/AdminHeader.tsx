"use client";

import React from "react";
import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";

export default function AdminHeader() {
	const clearAuth = useAuthStore((state) => state.clearAuth);
	const router = useRouter();

	const handleLogout = () => {
		clearAuth(); // Zustand 상태 초기화
		router.push("/"); // 로그아웃 후 리다이렉트
	};

	return (
		<header className="n-header">
			<div>
				<label className="n-icon n-icon:menu n-icon-size:6 mr:3 cursor:pointer hover">
					<span>사이드메뉴버튼</span>
					<input className="d:none n-aside-toggle" type="checkbox" />
				</label>
			</div>
			<h1 className="n-heading:2">
				<Link href="/">NCafe</Link>
			</h1>
			<nav className="ml:auto">
				<h1 className="d:none">헤더메뉴</h1>
				<ul className="n-list">
					<li>
						<button className="n-btn" onClick={handleLogout}>
							로그아웃
						</button>
					</li>
				</ul>
			</nav>
		</header>
	);
}

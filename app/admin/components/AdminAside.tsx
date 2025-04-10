"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminAside() {
	const pathname = usePathname();

	const isActive = (href: string) => {
		if (href === "/admin") {
			return pathname === href; // "/admin"은 완전히 동일할 때만 active
		}
		return pathname.startsWith(href); // 다른 경우는 포함되면 active
	};

	return (
		<aside className="">
			<header className="n-aside-menu">
				<h1 className="d:none">
					<Link href="">관리자 메뉴</Link>
				</h1>
				<ul>
					<li className={isActive("/admin") ? "active" : ""}>
						<Link
							className="n-icon n-icon:dashboard n-deco n-deco-pos:top lg:n-deco-pos:left"
							href="/admin"
						>
							대시보드
						</Link>
					</li>
				</ul>
			</header>
			<nav className="n-aside-menu">
				<h1>재품관리</h1>
				<ul>
					<li className={isActive("/admin/menus") ? "active" : ""}>
						<Link
							className="n-icon n-icon:local_cafe n-deco n-deco-pos:top lg:n-deco-pos:left"
							href="/admin/menus"
						>
							메뉴관리
						</Link>
					</li>
					<li className={isActive("/admin/categories") ? "active" : ""}>
						<Link
							className="n-icon n-icon:garage_home n-deco n-deco-pos:top lg:n-deco-pos:left"
							href="/admin/categories"
						>
							카테고리관리
						</Link>
					</li>
				</ul>
			</nav>
			<nav className="n-aside-menu">
				<h1>고객관리</h1>
				<ul>
					<li className={isActive("/admin/notices") ? "active" : ""}>
						<Link
							className="n-icon n-icon:notifications n-deco n-deco-pos:top lg:n-deco-pos:left"
							href="/admin/notices"
						>
							공지관리
						</Link>
					</li>
					<li className={isActive("/admin/members") ? "active" : ""}>
						<Link
							className="n-icon n-icon:group n-deco n-deco-pos:top lg:n-deco-pos:left"
							href="/admin/members"
						>
							회원관리
						</Link>
					</li>
				</ul>
			</nav>
			<nav className="n-aside-menu">
				<h1>통계관리</h1>
				<ul>
					<li className={isActive("/admin/likes") ? "active" : ""}>
						<Link
							className="n-icon n-icon:cardio_load n-deco n-deco-pos:top lg:n-deco-pos:left"
							href="/admin/likes"
						>
							좋아요
						</Link>
					</li>
					<li className={isActive("/admin/bookmarks") ? "active" : ""}>
						<Link
							className="n-icon n-icon:bookmarks n-deco n-deco-pos:top lg:n-deco-pos:left"
							href="/admin/bookmarks"
						>
							찜목록
						</Link>
					</li>
				</ul>
			</nav>
		</aside>
	);
}

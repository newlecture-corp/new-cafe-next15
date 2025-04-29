"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./RootHeader.module.scss";
import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState, MouseEvent } from "react";

// 스타일 모듈을 쉽게 사용하기 위해 destructuring & camel 표기로 매핑
const {
	header,
	["top-mobile-menu"]: topMobileMenu,
	["top-menu"]: topMenu,
} = styles;

const RootHeader = () => {
	const { username, clearAuth } = useAuthStore();
	const [authenticated, setAuthenticated] = useState(false);
	const router = useRouter();

	useEffect(() => {
		// 클라이언트에서만 실행
		setAuthenticated(username !== undefined && username !== null);
	}, [username]);

	const handleLogout = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault(); // 기본 동작 방지
		clearAuth(); // 인증정보 지우기
		router.push("/"); // 루트로 이동
	};

	return (
		<header className={`${header}`}>
			<h1>
				<Link href="/">NCafe</Link>
			</h1>
			<div className={topMobileMenu}>
				<Link
					className="n-icon n-icon:menu n-icon-color:base-1"
					href="top-menu=1"
				>
					숨김버튼
				</Link>
			</div>
			<div className={topMenu}>
				<nav>
					<h1 className="d:none">상단메뉴</h1>
					<ul>
						<li>
							<Link className="n-icon n-icon:home n-icon-color:base-1" href="/">
								홈
							</Link>
						</li>
						<li>
							<Link
								className="n-icon n-icon:dashboard n-icon-color:base-1"
								href="/admin"
							>
								대시보드
							</Link>
						</li>
						<li>
							{authenticated ? (
								<Link
									className="n-icon n-icon:logout n-icon-color:base-1"
									onClick={handleLogout}
									href="/logout"
								>
									로그아웃
								</Link>
							) : (
								<Link
									className="n-icon n-icon:login n-icon-color:base-1"
									href="/login"
								>
									로그인
								</Link>
							)}
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default RootHeader;

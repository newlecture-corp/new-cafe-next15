"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./RootHeader.module.scss";

// 스타일 모듈을 쉽게 사용하기 위해 destructuring & camel 표기로 매핑
const {
	header,
	["top-mobile-menu"]: topMobileMenu,
	["top-menu"]: topMenu,
} = styles;

const RootHeader = () => {
	const { data: session } = useSession();
	console.log("=== header test session print===");
	console.log(session);

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
							{session ? (
								<a
									className="n-icon n-icon:logout n-icon-color:base-1"
									onClick={() => signOut()}
									href="#"
								>
									로그아웃
								</a>
							) : (
								<a
									className="n-icon n-icon:login n-icon-color:base-1"
									onClick={() => signIn()}
									href="#"
								>
									로그인
								</a>
							)}
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default RootHeader;

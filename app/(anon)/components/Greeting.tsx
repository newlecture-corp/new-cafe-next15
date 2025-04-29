import React from "react";
import styles from "./Greeting.module.scss"; // CSS 모듈을 사용하여 스타일을 적용합니다.
import Link from "next/link";
import Image from "next/image";

const { ["greeting-box"]: greetingBox, greeting } = styles;

const Greeting: React.FC = () => {
	return (
		<div className={greetingBox}>
			<section className={greeting}>
				<header>
					<h1>뉴-카페에 오신 것을 환영합니다.</h1>
					<h2>팀 프로젝트할 때 꼭 들리는 카페</h2>
					<div>
						<Link href="/menus" className="n-btn n-btn-color:main">
							주문하기
						</Link>
					</div>
				</header>
				<div>
					<Image
						src="/image/assets/main-top.png"
						alt="뉴카페 환영이미지"
						width={865}
						height={1153}
					/>
				</div>
				<footer>
					<h2>N-Cafe Coffee</h2>
					<div>
						<Image
							src="/image/assets/logo-badge.svg"
							alt="뉴카페 badge"
							width={100}
							height={100}
						/>
					</div>
				</footer>
			</section>
		</div>
	);
};

export default Greeting;

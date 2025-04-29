import styles from "./RootFooter.module.scss";

// 스타일 모듈을 쉽게 사용하기 위해 destructuring & camel 표기로 매핑
const { footer, ["footer-box"]: footerBox } = styles;

export default function RootFooter() {
	return (
		<footer className={footerBox}>
			<section className={footer}>
				<h1 className="d:none">푸터</h1>
				<p className="d:flex jc:center color:base-3">
					ⓒ 2020 new cafe. All rights reserved.
				</p>
			</section>
		</footer>
	);
}

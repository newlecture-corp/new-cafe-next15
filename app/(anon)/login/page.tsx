import Link from "next/link";
import React, { FC } from "react";
import styles from "./page.module.scss";
import { login } from "./actions/login";

// 스타일 모듈을 쉽게 사용하기 위해 destructuring & camel 표기로 매핑
const {
	["login-form-box"]: loginFormBox,
	["login-form"]: loginForm,
	["btn-google-login"]: btnGoogleLogin,
	["link-box"]: linkBox,
} = styles;

const LoginPage: FC = () => {
	return (
		<main>
			<div className={loginFormBox}>
				<section className={loginForm}>
					<h1>NCafe Login</h1>
					<form action={login}>
						<div className="input-box">
							<label>ID</label>
							<input type="text" name="username" placeholder="아이디" />
						</div>
						<div className="input-box">
							<label>Password</label>
							<input type="password" name="password" placeholder="비밀번호" />
						</div>
						<div>
							<button type="submit">Login</button>
						</div>
						<div>또는</div>
						<div>
							<Link
								href="/"
								className={`${btnGoogleLogin} n-icon n-icon:google_logo n-deco`}
							>
								구글로 로그인
							</Link>
						</div>
						<div className={linkBox}>
							<Link href="signup">회원가입</Link>
							<Link href="">비밀번호 찾기</Link>
						</div>
					</form>
				</section>
			</div>
		</main>
	);
};

export default LoginPage;

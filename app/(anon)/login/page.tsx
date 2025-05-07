"use client";
import Link from "next/link";
import React, { FC, FormEvent, useState } from "react";
import styles from "./page.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

const {
	["login-form-box"]: loginFormBox,
	["login-form"]: loginForm,
	["btn-google-login"]: btnGoogleLogin,
	["link-box"]: linkBox,
} = styles;

const LoginPage: FC = () => {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") || "/";

	const router = useRouter();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const result = await signIn("credentials", {
			redirect: false,
			username,
			password,
		});

		if (result?.error) {
			setError("로그인 에러 : 아이디 또는 비밀번호가 잘못되었습니다.");
		} else {
			router.push(callbackUrl); // 로그인 성공 시 홈으로
		}
	};

	return (
		<main>
			<div className={loginFormBox}>
				<section className={loginForm}>
					<h1>Rland Login</h1>
					<form onSubmit={handleLogin}>
						<div className="input-box">
							<label>ID</label>
							<input
								type="text"
								name="username"
								placeholder="아이디"
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						<div className="input-box">
							<label>Password</label>
							<input
								type="password"
								name="password"
								placeholder="비밀번호"
								onChange={(e) => setPassword(e.target.value)}
							/>
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
					{error && <p style={{ color: "red" }}>{error}</p>}
				</section>
			</div>
		</main>
	);
};

export default LoginPage;

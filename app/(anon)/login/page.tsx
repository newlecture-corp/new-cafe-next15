"use client";
import Link from "next/link";
import React, { FC, FormEvent } from "react";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { decodeJwt } from "jose"; // jsonwebtoken 대신 jose 사용

// 스타일 모듈을 쉽게 사용하기 위해 destructuring & camel 표기로 매핑
const {
	["login-form-box"]: loginFormBox,
	["login-form"]: loginForm,
	["btn-google-login"]: btnGoogleLogin,
	["link-box"]: linkBox,
} = styles;

const LoginPage: FC = () => {
	const { username, setId, setUsername, setRoles, setToken } = useAuthStore();
	const router = useRouter();
	const { token } = useAuthStore();

	console.log("auth username", username);

	const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const username = formData.get("username") as string;
		const password = formData.get("password") as string;

		try {
			const response = await fetch("/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ username, password }),
			});

			if (!response.ok) {
				throw new Error("Login failed");
			}

			const data = await response.json();

			// Decode JWT using jose
			const decodedToken = decodeJwt(data.token) as {
				id: string;
				username: string;
				email: string;
				roles: string[];
				image: string;
				createdAt: string;
			};

			setId(decodedToken.id);
			setUsername(decodedToken.username);
			setRoles(decodedToken.roles);
			setToken(data.token);

			const returnURL = localStorage.getItem("returnURL");
			if (returnURL) {
				localStorage.removeItem("returnURL"); // Clean up after redirect
				router.push(returnURL);
			} else {
				router.push("/");
			}
		} catch (error) {
			// Handle login error
			console.error("Error during login:", error);
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

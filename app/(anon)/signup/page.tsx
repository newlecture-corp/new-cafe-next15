"use client";
import React, { FormEvent } from "react";

import styles from "./page.module.scss";
import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";

// 스타일 모듈을 쉽게 사용하기 위해 destructuring & camel 표기로 매핑
const {
	["reg-form-box"]: regFormBox,
	["reg-form"]: regForm,
	["link-box"]: linkBox,
} = styles;

export default function SignupPage() {
	const { token } = useAuthStore(); // 인증 토큰을 가져옵니다.

	const handleSignup = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		try {
			const response = await fetch("/api/members", {
				method: "POST",
				body: formData,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				throw new Error("회원가입에 실패했습니다.");
			}

			const result = await response.json();
			console.log("회원가입 성공:", result);
			alert("회원가입이 완료되었습니다!");
			// 추가적인 로직 (예: 페이지 이동)
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			} else {
				alert("알 수 없는 오류가 발생했습니다.");
			}
		}
	};

	return (
		<main>
			<div className={regFormBox}>
				<section className={regForm}>
					<h1>NCafe 회원가입</h1>
					<form action="/signup" method="post" onSubmit={handleSignup}>
						<div className="input-box">
							<label>이름</label>
							<input
								type="text"
								name="name"
								placeholder="아름"
								required
								minLength={2}
								maxLength={50}
							/>
						</div>
						<div className="input-box">
							<label>아이디</label>
							<input
								type="text"
								name="username"
								placeholder="아이디"
								required
								pattern="^[a-zA-Z0-9_]{4,20}$"
								title="아이디는 4~20자의 영문, 숫자, 밑줄(_)만 사용할 수 있습니다."
							/>
						</div>
						<div className="input-box">
							<label>이메일</label>
							<input type="email" name="email" placeholder="이메일" required />
						</div>
						<div className="input-box">
							<label>비밀번호</label>
							<input
								type="password"
								name="password"
								placeholder="비밀번호"
								required
								minLength={3}
								title="비밀번호는 최소 3자 이상이어야 합니다."
							/>
						</div>
						<div className="input-box">
							<label>비밀번호 확인</label>
							<input
								type="password"
								name="password1"
								placeholder="비밀번호 확인"
								required
								minLength={3}
								title="비밀번호 확인은 최소 3자 이상이어야 합니다."
							/>
						</div>
						<div className="input-box">
							<label className="d:inline-flex bd p:2">
								<input
									className="d:none"
									type="file"
									name="image"
									onChange={(e) => {
										if (e.target.nextElementSibling)
											e.target.nextElementSibling.textContent =
												e.target.files?.[0]?.name || "";
									}}
								/>
								<span className="file-label">프로필 사진선택</span>
							</label>
						</div>
						<div>
							<button type="submit">가입하기</button>
						</div>
						<div className={linkBox}>
							<Link href="login">로그인하기</Link>
						</div>
					</form>
				</section>
			</div>
		</main>
	);
}

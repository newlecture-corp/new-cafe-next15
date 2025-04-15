"use client";

import { useAuthStore } from "@/stores/authStore";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

export default function MenuCreatePage() {
	const { token } = useAuthStore();

	const [formData, setFormData] = useState({
		name: "",
		isPublic: false,
	});

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name === "is-public" ? "isPublic" : name]:
				type === "checkbox" ? checked : value,
		}));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const response = await fetch("/api/admin/categories", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				throw new Error("카테고리 생성 실패");
			}

			const result = await response.json();
			console.log("카테고리 생성됨:", result);
			if (
				window.confirm(
					"카테고리가 성공적으로 생성되었습니다! 확인을 누르면 카테고리 페이지로 돌아갑니다."
				)
			) {
				window.location.href = "/admin/categories";
			}
		} catch (error) {
			console.error("폼 제출 중 오류 발생:", error);
			alert("카테고리 생성 실패. 다시 시도해주세요.");
		}
	};

	return (
		<main>
			<section>
				<header className="n-bar">
					<h1 className="n-heading:5">제품관리 / 카테고리관리</h1>
					<div className="ml:3 d:flex ai:center">
						<Link
							href="../categories"
							className="n-icon n-icon:arrow_back n-btn n-btn:rounded n-btn-size:small"
						>
							추가
						</Link>
					</div>
				</header>

				<section className="n-frame:rounded-shadow">
					<header>
						<h1>
							<span className="n-icon n-icon:post_add n-deco">
								카테고리등록
							</span>
						</h1>
					</header>
					<form className="n-form n-label-pos:left" onSubmit={handleSubmit}>
						<div>
							<label>
								<span>이름</span>
								<input
									type="text"
									name="name"
									value={formData.name}
									onChange={handleInputChange}
								/>
							</label>
						</div>
						<div>
							<label>
								<span className="fs:7">공개</span>
								<input
									type="checkbox"
									name="is-public"
									checked={formData.isPublic}
									onChange={handleInputChange}
									className="n-toggle flex-grow:0"
								/>
							</label>
						</div>

						<div className="fl-dir:row jc:end">
							<button type="submit" className="n-btn n-btn-color:main">
								등록
							</button>
							<Link href="../categories" className="n-btn">
								취소
							</Link>
						</div>
					</form>
				</section>
			</section>
		</main>
	);
}

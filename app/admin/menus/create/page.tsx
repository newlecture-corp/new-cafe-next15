"use client";

import { CreatedMenuDto } from "@/application/usecases/admin/menu/dto/CreatedMenuDto";
import { CategoryDto } from "@/application/usecases/category/dto/CategoryDto";
import { fetchWithAuthClient } from "@/lib/fetchWithAuthClient";

import Link from "next/link";

import { useEffect, useState } from "react";

export default function MenuCreatePage() {
	// 카테고리 목록 조회하기 =================================
	const [categories, setCategories] = useState<CategoryDto[]>([]);
	{
		useEffect(() => {
			const fetchCategories = async () => {
				try {
					const res = await fetchWithAuthClient("/api/categories");
					if (!res.ok) {
						throw new Error("Failed to fetch categories");
					}
					const categoryListDto = await res.json();
					setCategories(categoryListDto.categories);
				} catch (error) {
					console.error("Error fetching categories:", error);
					alert("카테고리 목록을 불러오는 중 오류가 발생했습니다.");
				}
			};

			fetchCategories();
		}, []);
	}

	// 메뉴 등록하기 =========================================
	// - 폼데이터 상태변수들
	const [formData, setFormData] = useState({
		category: "",
		korName: "",
		engName: "",
		price: "",
		description: "",
	});

	// - 사용자 입력 이벤트 핸들러들
	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// - 폼 제출 핸들러
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		let data: CreatedMenuDto;
		{
			try {
				const res = await fetchWithAuthClient("/api/admin/menus", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				});
				if (!res.ok) {
					throw new Error("Failed to submit form");
				}

				data = await res.json();
				console.log("created menu : ", data);
				alert("메뉴가 성공적으로 등록되었습니다.");
			} catch (error) {
				console.error(error);
				alert("메뉴 등록 중 오류가 발생했습니다.");
			}
		}
	};

	return (
		<main>
			<section className="d:flex flex-direction:column gap:5">
				<header className="n-list">
					<h1 className="n-heading:5">제품관리 / 메뉴관리</h1>
					<div className="ml:3 d:flex ai:center">
						<Link
							href="../menus"
							className="n-icon n-icon:arrow_back icon-bd:circle"
						>
							추가
						</Link>
					</div>
				</header>

				<section className="n-frame:1">
					<header>
						<h1>
							<span className="n-icon n-icon:post_add n-deco">메뉴등록</span>
						</h1>
					</header>
					<form className="n-form n-label-pos:left" onSubmit={handleSubmit}>
						<div>
							<label>
								<span>카테고리</span>
								<select
									name="categoryId"
									value={formData.category}
									onChange={handleChange}
								>
									<option value="">선택</option>

									{categories.map((category) => (
										<option key={category.id} value={category.id}>
											{category.name}
										</option>
									))}
								</select>
							</label>
						</div>
						<div>
							<label>
								<span>한글명</span>
								<input
									type="text"
									name="korName"
									value={formData.korName}
									onChange={handleChange}
								/>
							</label>
						</div>
						<div>
							<label>
								<span>영문명</span>
								<input
									type="text"
									name="engName"
									value={formData.engName}
									onChange={handleChange}
								/>
							</label>
						</div>
						<div>
							<label>
								<span>가격</span>
								<input
									type="text"
									name="price"
									value={formData.price}
									onChange={handleChange}
								/>
							</label>
						</div>
						<div>
							<label>
								<span>설명</span>
								<textarea
									name="description"
									value={formData.description}
									onChange={handleChange}
								></textarea>
							</label>
						</div>
						<div className="fl-dir:row jc:end">
							<button
								type="submit"
								className="n-btn n-btn-color:main-1"
								name="create"
							>
								등록
							</button>
							<button
								type="submit"
								className="n-btn n-btn-color:main-1"
								name="create-with-image"
							>
								등록 후 이미지 추가
							</button>
							<Link href="../menus" className="n-btn">
								취소
							</Link>
						</div>
					</form>
				</section>
			</section>
		</main>
	);
}

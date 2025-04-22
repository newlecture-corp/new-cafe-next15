"use client";

import { CategoryDto } from "@/application/usecases/admin/category/dto/CategoryDto";
import { useAuthStore } from "@/stores/authStore";
import React, { useState, useEffect } from "react";

interface SearchFormProps {
	onSearch: (searchWord: string, categoryId: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
	const { token } = useAuthStore();

	const [searchWord, setSearchWord] = useState("");
	const [categoryId, setCategoryId] = useState("");
	const [categories, setCategories] = useState<CategoryDto[]>([]);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await fetch("/api/categories", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (!response.ok) {
					throw new Error("Failed to fetch categories");
				}
				const data = await response.json();
				setCategories(data.categories); // Assuming the API returns an array of categories
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};

		fetchCategories();
	}, []);

	const searchSubmitHandler = (e: React.FormEvent) => {
		e.preventDefault();
		onSearch(searchWord, categoryId);
	};

	return (
		<section className="n-frame n-expandable">
			<header>
				<h1>
					<span className="n-icon n-icon:search n-deco">검색</span>{" "}
					{/* 검색 아이콘 */}
				</h1>
				<div className="ml:auto">
					<label className="n-icon n-icon:arrow_drop_down cursor:pointer">
						<span>확장버튼</span> {/* 확장 버튼 */}
						<input className="d:none n-btn:expander" type="checkbox" />
					</label>
				</div>
			</header>
			<form className="n-form n-label-pos:left" onSubmit={searchSubmitHandler}>
				<div>
					<label>
						<span>한글명</span> {/* 한글명 입력 필드 */}
						<input
							type="text"
							name="sw"
							value={searchWord}
							onChange={(e) => setSearchWord(e.target.value)}
						/>
					</label>
					<label>
						<span>카테고리</span> {/* 카테고리 선택 필드 */}
						<select
							name="category"
							value={categoryId}
							onChange={(e) => setCategoryId(e.target.value)}
						>
							<option value="">전체</option>
							{categories.map((category) => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</select>
					</label>
					<div className="d:flex justify-content:end">
						<button className="n-btn n-btn-color:main" type="submit">
							검색
						</button>{" "}
						{/* 검색 버튼 */}
						<button
							className="n-btn ml:1"
							type="reset"
							onClick={() => {
								setSearchWord("");
								setCategoryId("");
							}}
						>
							취소
						</button>{" "}
						{/* 취소 버튼 */}
					</div>
				</div>
			</form>
		</section>
	);
};

export default SearchForm;

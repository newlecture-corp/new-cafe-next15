"use client";

import Link from "next/link";
import React, { useState } from "react";
import Pager from "../components/Pager";
import { useEffect } from "react";
import { CategoryListDto } from "@/application/usecases/admin/category/dto/CategoryListDto";
import { CategoryDto } from "@/application/usecases/admin/category/dto/CategoryDto";
import { useSearchParams } from "next/navigation";

// 이 컴포넌트는 클라이언트 사이드에서 렌더링됩니다.

export default function CategoryListPage() {
	// 쿼리스트링 값 가져오기
	const searchParams = useSearchParams(); // URL에서 쿼리 파라미터를 가져옵니다.
	const pageParam = searchParams.get("p");

	const [categories, setCategories] = useState<CategoryDto[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(
		Number(pageParam || "1")
	);
	const [totalCount, setTotalCount] = useState<number>(0);
	const [pages, setPages] = useState<number[]>([]);

	useEffect(() => {
		async function fetchCategories() {
			try {
				// URLSearchParams 객체를 생성합니다.
				const params = new URLSearchParams();

				// 쿼리 파라미터를 추가합니다.
				params.append("p", currentPage.toString());

				console.log("params", params.toString());

				// API 호출
				const response = await fetch(
					`/api/admin/categories?${params.toString()}`
				);

				const data: CategoryListDto = await response.json();

				console.log("data", data);

				setCategories(data.categories);
				setTotalCount(data.totalCount);
				setPages(data.pages);
			} catch (error) {
				console.error("Failed to fetch categories:", error);
			}
		}

		fetchCategories();
	}, [currentPage]);

	// 이벤트 핸들러 함수들 ----------------------------------
	function handleCheckboxChange(
		e: React.ChangeEvent<HTMLInputElement>,
		id: number | undefined
	): void {
		if (id === undefined) return;

		const isChecked = e.target.checked;

		setCategories((prevCategories) =>
			prevCategories.map((category) =>
				category.id === id ? { ...category, isPublic: isChecked } : category
			)
		);

		// 서버에 업데이트 요청
		async function toggleCategoryPublic() {
			try {
				const response = await fetch(`/api/admin/categories/${id}/is-public`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ isPublic: isChecked }),
				});

				if (!response.ok) {
					throw new Error("Failed to update category visibility");
				}
			} catch (error) {
				console.error("Error updating category visibility:", error);
			}
		}

		toggleCategoryPublic();
	}

	return (
		<main>
			<section>
				<header className="n-bar">
					<h1 className="n-heading:5">제품관리 / 카테고리리관리</h1>
					{/* 페이지 제목 */}
					<div className="ml:3 d:flex">
						<Link
							href="categories/create"
							className="n-icon n-icon:add n-btn n-btn:rounded n-btn-size:small"
						>
							추가 {/* 메뉴 추가 버튼 */}
						</Link>
					</div>
				</header>

				<section className="n-frame:rounded-shadow">
					<header>
						<h1 className="d:none2">
							<span className="n-icon n-icon:view_list n-deco n-deco-gap:2">
								카테고리리목록
							</span>
						</h1>
						<div>
							<span className="ml:1 n-heading:6">({totalCount})</span>
						</div>
					</header>

					<table className="n-table n-table:expandable">
						<thead>
							<tr>
								<th className="w:1">번호</th>
								<th>이름</th>
								<th className="w:3">공개</th>
								<th className="w:3">비고</th>
							</tr>
						</thead>

						{categories.map((category) => {
							return (
								<tbody key={category.id}>
									<tr className="vertical-align:middle">
										<td>{category.id}</td>
										<td className="text-align:start n-heading-truncate">
											{category.name}
										</td>
										<td>
											<span className="d:inline-flex align-items:center">
												<label>
													<span className="fs:7 d:none">공개</span>
													<input
														type="checkbox"
														name="isPublic"
														className="n-toggle flex-grow:0"
														checked={category.isPublic}
														onChange={(e) =>
															handleCheckboxChange(e, category.id)
														}
													/>
												</label>
											</span>
										</td>
										<td>
											<span className="d:inline-flex align-items:center">
												<Link
													className="n-icon n-icon:edit_square n-icon-color:base-6"
													href="detail.html"
												>
													수정
												</Link>
												<form className="d:flex ai:center">
													<input type="hidden" name="id" value="1" />
													<button
														className="n-icon n-icon:delete n-icon-color:base-6"
														type="submit"
													>
														삭제
													</button>
												</form>
											</span>
										</td>
									</tr>
								</tbody>
							);
						})}
					</table>
					<div className="mt:4 text-align:center">
						{/* 페이지네이션 컴포넌트 */}
						<Pager
							currentPage={currentPage}
							endPage={pages.length > 0 ? pages[pages.length - 1] : 1}
							onPageChange={(newPage) => setCurrentPage(newPage)}
						/>
					</div>
				</section>
			</section>
		</main>
	);
}

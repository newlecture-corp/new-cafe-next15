"use client";

import Link from "next/link";
import React, { useState, MouseEvent } from "react";
import Pager from "../components/Pager";
import { useEffect } from "react";
import { CategoryListDto } from "@/application/usecases/admin/category/dto/CategoryListDto";
import { CategoryDto } from "@/application/usecases/admin/category/dto/CategoryDto";
import { useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

// 이 컴포넌트는 클라이언트 사이드에서 렌더링됩니다.

export default function CategoryListPage() {
	const searchParams = useSearchParams();
	// 쿼리스트링 값 가져오기
	const pageParam = searchParams.get("p");
	const sortFieldParam = searchParams.get("sf");
	const ascendingParam = searchParams.get("asc");

	const { token } = useAuthStore();

	// 페이지 상태변수 초기화
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [categories, setCategories] = useState<CategoryDto[]>([]);
	const [includeAll, setIncludeAll] = useState<boolean>(false);
	const [sortField, setSortField] = useState<string | null>("order");
	const [ascending, setAscending] = useState<boolean>(true);
	const [totalCount, setTotalCount] = useState<number>(0);
	const [pages, setPages] = useState<number[]>([]);

	// 상태변수 초기화
	if (pageParam) setCurrentPage(Number(pageParam)); // 쿼리스트링에서 페이지 번호 가져오기
	if (sortFieldParam) setSortField(sortFieldParam); // 쿼리스트링에서 정렬 필드 가져오기
	if (ascendingParam) setAscending(ascendingParam === "true"); // 쿼리스트링에서 정렬 순서 가져오기

	useEffect(() => {
		async function fetchCategories() {
			try {
				// URLSearchParams 객체를 생성합니다.
				const params = new URLSearchParams();

				// 쿼리 스트링을 위한 파라미터를 추가.
				params.append("p", currentPage.toString());
				params.append("all", includeAll.toString());
				if (sortField) params.append("sf", sortField); // 정렬 필드
				if (ascending) params.append("asc", ascending.toString()); // 정렬 순서

				console.log("params", params.toString());

				// API 호출
				const response = await fetch(
					`/api/admin/categories?${params.toString()}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
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
	}, [ascending, currentPage, includeAll, sortField, token]);

	// 이벤트 핸들러 함수들 ----------------------------------
	function handlePublicCheckboxChange(
		e: React.ChangeEvent<HTMLInputElement>,
		id: number | undefined
	): void {
		if (id === undefined) return;

		const isChecked = e.target.checked;

		// 메뉴이 이미 등록된 카테고리인 경우 비공개로 설정할 수 없음
		const category = categories.find((category) => category.id === id);
		if (!isChecked && category && (category.menuCount ?? 0) > 0) {
			const confirmHide = window.confirm(
				"카테고리에 포함된 메뉴가 존재합니다. \r\n비공개로 하면 사용자에게 메뉴가 노출되지 않습니다. 계속하시겠습니까?"
			);
			if (!confirmHide) {
				e.target.checked = true; // 체크박스를 다시 체크 상태로 복구
				return;
			}
		}

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
						Authorization: `Bearer ${token}`,
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

	async function handleDeleteCategory(id: number | undefined): Promise<void> {
		if (id === undefined) return;

		// 삭제 확인
		const confirmDelete = window.confirm(
			"정말로 이 카테고리를 삭제하시겠습니까?"
		);
		if (!confirmDelete) return;

		try {
			const response = await fetch(`/api/admin/categories/${id}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				throw new Error("Failed to delete category");
			}

			// 삭제 성공 시, 로컬 상태에서 해당 카테고리 제거
			setCategories((prevCategories) =>
				prevCategories.filter((category) => category.id !== id)
			);
		} catch (error) {
			console.error("Error deleting category:", error);
		}
	}

	async function handleAllIncludeCheckboxChange(
		e: React.ChangeEvent<HTMLInputElement>
	): Promise<void> {
		const isChecked = e.target.checked;

		setIncludeAll(isChecked);
		setCurrentPage(1); // 페이지를 1로 초기화
	}

	function handleFieldSortChange(
		e: MouseEvent<HTMLAnchorElement>,
		field: string
	) {
		e.preventDefault();

		// 토글 정렬 순서
		if (sortField === field) {
			setAscending((prev) => !prev); // 동일 필드 클릭 시 정렬 순서만 변경
		} else {
			setSortField(field); // 다른 필드 클릭 시 필드 변경
			setAscending(true); // 기본적으로 오름차순으로 설정
		}

		console.log(`Sorting by ${field}, ascending: ${ascending}`);
	}

	return (
		<main>
			<section className="d:flex flex-direction:column gap:5">
				<header className="n-list">
					<h1 className="n-heading:5">제품관리 / 카테고리리관리</h1>
					{/* 페이지 제목 */}
					<div className="ml:3 d:flex">
						<Link
							href="categories/create"
							className="n-icon n-icon:add icon-bd:circle"
						>
							추가 {/* 메뉴 추가 버튼 */}
						</Link>
					</div>
				</header>

				<section className="n-frame">
					<header>
						<h1 className="d:none2">
							<span className="n-icon n-icon:view_list n-deco n-deco-gap:2">
								카테고리목록
							</span>
						</h1>
						<div>
							<span className="ml:1 n-heading:6">({totalCount})</span>
						</div>
					</header>

					<div className="d:flex ai:center justify-content:end mb:2">
						<label>
							<input
								type="checkbox"
								name="isPublic"
								className="n-toggle flex-grow:0"
								onChange={(e) => handleAllIncludeCheckboxChange(e)}
								checked={includeAll}
							/>
							<span className="fs:7">비공개포함</span>
						</label>
					</div>
					<table className="n-table">
						<thead>
							<tr>
								<th className="w:1">번호</th>
								<th className="w:0 md:w:2 overflow:hidden">
									<Link
										className="text-decoration-line:underline"
										href="#"
										onClick={(e) => {
											handleFieldSortChange(e, "order");
										}}
									>
										순번 {sortField === "order" && (ascending ? "▲" : "▼")}
									</Link>
								</th>
								<th>이름</th>
								<th className="w:0 md:w:2 overflow:hidden">
									<Link
										className="text-decoration-line:underline"
										href="#"
										onClick={(e) => {
											handleFieldSortChange(e, "menu_count");
										}}
									>
										메뉴개수
										{sortField === "menu_count" && (ascending ? "▲" : "▼")}
									</Link>
								</th>
								<th className="w:3">공개</th>
								<th className="w:3">비고</th>
							</tr>
						</thead>

						{categories.map((category) => {
							return (
								<tbody key={category.id}>
									<tr className="vertical-align:middle">
										<td>{category.id}</td>
										<td className="w:0 md:w:2 overflow:hidden">
											{category.order}
										</td>
										<td className="text-align:start n-heading-truncate">
											{category.name}
										</td>
										<td className="w:0 md:w:2 overflow:hidden">
											<Link
												href="#"
												className="text-decoration-line:underline"
												onClick={(e) => {
													e.preventDefault();
													const confirmNavigation = window.confirm(
														"메뉴관리 페이지로 이동하시겠습니까?"
													);
													if (confirmNavigation) {
														window.location.href = `/admin/menus?c=${category.id}`;
													}
												}}
											>
												{category.menuCount}
											</Link>
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
															handlePublicCheckboxChange(e, category.id)
														}
													/>
												</label>
											</span>
										</td>
										<td>
											<span className="d:inline-flex align-items:center">
												<Link
													className="n-icon n-icon:edit_square n-icon-color:base-6"
													href={`categories/${category.id}/edit`}
												>
													수정
												</Link>
												<form
													className="d:flex ai:center"
													onSubmit={(e) => {
														e.preventDefault();
														handleDeleteCategory(category.id);
													}}
												>
													<input type="hidden" name="id" value={category.id} />
													<button
														className="n-icon n-icon:delete n-icon-color:base-6 cursor:pointer"
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

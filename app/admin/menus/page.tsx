"use client"; // 이 컴포넌트는 클라이언트 사이드에서 렌더링됩니다.

import { MenuDto } from "@/application/usecases/admin/menu/dto/MenuDto"; // MenuDto 타입을 가져옵니다.
import { useEffect, useState } from "react"; // React의 useEffect와 useState 훅을 가져옵니다.
import Image from "next/image"; // Next.js의 최적화된 이미지 컴포넌트를 가져옵니다.
import { useSearchParams } from "next/navigation"; // URL의 쿼리 파라미터를 가져오는 훅입니다.
import Link from "next/link"; // Next.js의 클라이언트 사이드 네비게이션 컴포넌트입니다.
import Pager from "../components/Pager";
import SearchForm from "./components/SearchForm";
import RowEx from "./components/RowEx";

export default function MenuListPage() {
	console.log("page loaded"); // 페이지가 로드되었음을 콘솔에 출력합니다.
	// 쿼리스트링 값 가져오기
	const searchParams = useSearchParams(); // URL에서 쿼리 파라미터를 가져옵니다.
	const pageParam = searchParams.get("p");
	const searchWordParam = searchParams.get("q");
	const categoryIdParam = searchParams.get("c");

	// 상태 관리변수
	// - param 상태변수들
	const [searchWord, setSearchWord] = useState<string>(searchWordParam || ""); // 검색어를 저장하는 상태입니다.
	const [categoryId, setCategoryId] = useState<string>(categoryIdParam || ""); // 카테고리 ID를 저장하는 상태입니다.
	// - DTO 상태변수들
	const [menus, setMenus] = useState<MenuDto[]>([]); // 메뉴 데이터를 저장하는 상태입니다.
	const [totalCount, setTotalCount] = useState<number>(0); // 총 메뉴 개수를 저장하는 상태입니다.
	const [currentPage, setCurrentPage] = useState<number>(
		parseInt(pageParam || "1", 10)
	);

	const [pages, setPages] = useState<number[]>([]); // 페이지 목록을 저장하는 상태입니다.
	const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>(
		{}
	); // State to track expanded rows

	const toggleRowExpansion = (menuId: number) => {
		setExpandedRows((prev) => ({
			...prev,
			[menuId]: !prev[menuId], // 특정 행의 확장 상태를 토글
		}));
	};

	// 메뉴 데이터를 가져오는 useEffect 훅
	useEffect(() => {
		console.log("useEffect called"); // useEffect가 호출되었음을 콘솔에 출력합니다.
		const fetchMenus = async () => {
			try {
				// URLSearchParams 객체를 생성합니다.
				const params = new URLSearchParams();

				// 쿼리 파라미터를 추가합니다.
				if (currentPage) params.append("p", currentPage.toString());
				if (searchWord) params.append("sw", searchWord);
				if (categoryId) params.append("c", categoryId);

				// API 호출
				const response = await fetch(`/api/admin/menus?${params.toString()}`);
				const data = await response.json();

				// 상태 업데이트
				setMenus(data.menus);
				setTotalCount(data.totalCount);
				setPages(data.pages); // 페이지 목록 상태 업데이트
			} catch (error) {
				console.error("Failed to fetch menus:", error); // 에러 발생 시 로그를 출력합니다.
			}
		};

		// 메뉴 데이터를 가져오는 함수를 호출합니다.
		fetchMenus();

		// 의존성 배열에 상태 변수를 추가합니다.
	}, [currentPage, searchWord, categoryId]);

	// 검색 폼 제출 핸들러
	const handleSearchSubmit = (searchWord: string, categoryId: string) => {
		setCurrentPage(1);
		setSearchWord(searchWord);
		setCategoryId(categoryId);
	};

	return (
		<main>
			<section>
				<header className="n-bar">
					<h1 className="n-heading:5">제품관리 / 메뉴관리</h1>
					{/* 페이지 제목 */}
					<div className="ml:3 d:flex">
						<Link
							href="menus/create"
							className="n-icon n-icon:add n-btn n-btn:rounded n-btn-size:small"
						>
							추가 {/* 메뉴 추가 버튼 */}
						</Link>
					</div>
				</header>

				<SearchForm onSearch={handleSearchSubmit} />

				<section className="n-frame:rounded-shadow">
					<header>
						<h1 className="d:none2">
							<span className="n-icon n-icon:view_list n-deco n-deco-gap:2">
								메뉴목록
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
								<th className="w:0 md:w:2 overflow:hidden">사진</th>
								<th>한글명</th>
								<th className="w:0 md:w:2 n-heading-truncate">영문명</th>
								<th className="w:3">비고</th>
							</tr>
						</thead>

						{menus.length === 0 && (
							<tbody>
								<tr>
									<td colSpan={5} className="text-align:center">
										🍔🍕🍣 아직! 찾는 메뉴가 없어요 😢
									</td>
								</tr>
							</tbody>
						)}

						{menus.map((menu) => {
							const isExpanded = expandedRows[menu.id] || false; // Check if the row is expanded

							return (
								<tbody key={menu.id}>
									<tr className="vertical-align:middle">
										<td>{menu.id}</td>
										<td className="w:0 md:w:2 overflow:hidden">
											<Image
												src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/image/product/${menu.defaultImage}`}
												alt={menu.korName}
												width={50}
												height={50}
											/>
										</td>
										<td className="text-align:start n-heading-truncate">
											<Link href="detail.html">{menu.korName}</Link>
										</td>
										<td className="w:0 md:w:2 n-heading-truncate">
											{menu.engName}
										</td>
										<td>
											<span className="d:inline-flex align-items:center">
												<label className="n-icon n-icon:arrow_drop_down n-icon-size:2 n-btn mr:2">
													<input
														type="checkbox"
														className="d:none n-row-expander"
														checked={isExpanded}
														onChange={() => toggleRowExpansion(menu.id)} // Toggle expansion for this row
													/>
													<span>상세보기</span>
												</label>
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
									{isExpanded && <RowEx menuId={menu.id} />}
									{/* Conditionally render RowEx for this row */}
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

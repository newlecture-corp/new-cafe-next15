"use client";

// import { useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./Pager.module.scss";

const { pager, ["page-list-box"]: pageListBox, disabled, active } = styles;

type PagerProps = {
	query: { [key: string]: string | string[] | undefined };
	pageSize: number;
	endPage: number;
};

const Pager = ({ query, pageSize, endPage }: PagerProps) => {
	/*
  // 클라리언트에서 실행할 때
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("p")) || 1;  
  */

	const page = query.p || "1"; // 쿼리에서 페이지 번호 가져오기
	const currentPage = Number(page); // 현재 페이지 번호
	const categoryId = (query.c || "") as string; // 카테고리 ID
	const searchWord = (query.s || "") as string; // 검색어

	const startPageNum = Math.floor((currentPage - 1) / pageSize) * pageSize + 1; // 시작 페이지
	const endPageNum = Math.min(startPageNum + pageSize - 1, endPage); // 끝 페이지
	const hasPreviousPage = currentPage > 1; // 이전 페이지 존재 여부
	const hasNextPage = currentPage < endPage; // 다음 페이지 존재 여부
	const list: number[] = Array.from(
		{ length: endPageNum - startPageNum + 1 },
		(_, i) => startPageNum + i
	);

	console.log("------ Pager Props ---");
	console.log("query: ", query);
	console.log("currentPage: ", currentPage);
	console.log("startPageNum: ", startPageNum);
	console.log("endPageNum: ", endPageNum);
	console.log("list: ", list);

	const createQueryString = (page: number) => {
		const params = new URLSearchParams();
		console.log("params: ", params);
		if (page) params.set("p", page.toString());
		if (categoryId) params.set("c", categoryId);
		if (searchWord) params.set("s", searchWord);
		return params.toString();
	};

	return (
		<section className={pager}>
			<h1>페이지</h1>
			<div className={pageListBox}>
				<div>
					{hasPreviousPage ? (
						<Link href={`menus?${createQueryString(currentPage - 1)}`}>
							이전
						</Link>
					) : (
						<span className={disabled}>이전</span>
					)}
				</div>
				<ul>
					{list.map((num) => (
						<li
							key={num}
							className={num === currentPage ? active : undefined} // 현재 페이지에 active 클래스 추가
						>
							<Link href={`menus?${createQueryString(num)}`}>{num}</Link>
						</li>
					))}
				</ul>
				<div>
					{hasNextPage ? (
						<Link href={`menus?${createQueryString(currentPage + 1)}`}>
							다음
						</Link>
					) : (
						<span className={disabled}>다음</span>
					)}
				</div>
			</div>
		</section>
	);
};

export default Pager;

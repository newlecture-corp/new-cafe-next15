"use client";

import React, { FC } from "react";

interface PagerProps {
	currentPage: number;
	endPage: number;
	onPageChange: (newPage: number) => void; // Custom event for page change
}

const Pager: FC<PagerProps> = ({ currentPage, endPage, onPageChange }) => {
	const startNumber = Math.floor((currentPage - 1) / 5) * 5 + 1; // 시작 페이지 번호 계산
	const pages = Array.from({ length: 5 }, (_, i) => startNumber + i).filter(
		(page) => page <= endPage
	); // 5개의 번호 배열 생성 및 endPage 조건 필터링
	const hasNextPage = startNumber + 4 < endPage; // 다음 페이지 존재 여부
	const hasPreviousPage = currentPage > 5; // 이전 페이지 존재 여부

	return (
		<section className="d:flex jc:center ai:center gap:2 h:100p">
			<h1 className="d:none">페이저</h1>
			{hasPreviousPage ? (
				<button
					className="n-btn"
					onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
				>
					이전
				</button>
			) : (
				<div className="n-btn disabled">이전</div>
			)}
			<ul className="n-list gap:2">
				{pages.map((pageNumber) => (
					<li key={pageNumber}>
						<button
							className={`n-btn ${
								pageNumber === currentPage ? "n-active" : ""
							}`}
							onClick={() => onPageChange(pageNumber)}
						>
							{pageNumber} {/* 페이지 번호 */}
						</button>
					</li>
				))}
			</ul>
			{hasNextPage ? (
				<button className="n-btn" onClick={() => onPageChange(currentPage + 1)}>
					다음
				</button>
			) : (
				<div className="n-btn disabled">다음</div>
			)}
		</section>
	);
};

export default Pager;

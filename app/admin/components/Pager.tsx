import React from 'react';
import Link from 'next/link';



interface PagerProps {
    pages: number[];
    currentPage: number;
    query?: string;
    categoryId?: string;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
}

const Pager: React.FC<PagerProps> = ({ pages, currentPage, query, categoryId, hasNextPage, hasPreviousPage }) => {
    return (
        <section className="d:flex jc:center ai:center gap:2 h:100p">
            <h1 className="d:none">페이저</h1>
            {hasPreviousPage ? (
                <Link
                    className="n-btn"
                    href={`?${[
                        currentPage - 1 && `p=${currentPage - 1}`,
                        query && `q=${query}`,
                        categoryId && `c=${categoryId}`,
                    ]
                        .filter(Boolean)
                        .join('&')}`}
                >
                    이전
                </Link>
            ) : (
                <div className="n-btn disabled">이전</div>
            )}
            <ul className="n-bar">
                {pages.map((pageNumber) => (
                    <li key={pageNumber}>
                        <Link
                            className={`n-btn ${pageNumber === currentPage ? 'active' : ''}`}
                            href={`?${[
                                pageNumber && `p=${pageNumber}`,
                                query && `q=${query}`,
                                categoryId && `c=${categoryId}`,
                            ]
                                .filter(Boolean)
                                .join('&')}`}
                        >
                            {pageNumber} {/* 페이지 번호 */}
                        </Link>
                    </li>
                ))}
            </ul>
            {hasNextPage ? (
                <Link
                    className="n-btn"
                    href={`?${[
                        currentPage + 1 && `p=${currentPage + 1}`,
                        query && `q=${query}`,
                        categoryId && `c=${categoryId}`,
                    ]
                        .filter(Boolean)
                        .join('&')}`}
                >
                    다음
                </Link>
            ) : (
                <div className="n-btn disabled">다음</div>
            )}
        </section>
    );
};

export default Pager;
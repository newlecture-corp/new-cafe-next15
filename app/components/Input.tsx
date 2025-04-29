"use client";
import { useEffect, useState } from "react";

function SearchWordInput() {
	const [searchWord, setSearchWord] = useState("");

	useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search);
		const sw = searchParams.get("searchWord") || "";
		setSearchWord(sw);
	}, []); // 빈 의존성 배열로 클라이언트 사이드에서 한 번만 실행

	return (
		<input
			type="text"
			name="s"
			placeholder="메뉴 검색"
			value={searchWord} // defaultValue 대신 value 사용
			onChange={(e) => {
				setSearchWord(e.target.value);
			}}
		/>
	);
}

export default SearchWordInput;

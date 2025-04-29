"use client";

import React from "react";

const EditCategoryPage = () => {
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		// Handle form submission logic here
	};

	return (
		<main>
			<section className="d:flex flex-direction:column gap:5">
				<header className="n-list">
					<h1 className="n-heading:5">제품관리 / 카테고리관리</h1>
					<div className="ml:3 d:flex ai:center">
						<a
							href="list.html"
							className="n-icon n-icon:arrow_back icon-bd:circle"
						>
							추가
						</a>
					</div>
				</header>

				<section className="n-frame:rounded-shadow">
					<header>
						<h1>
							<span className="n-icon n-icon:edit_square n-deco">
								카테고리수정
							</span>
						</h1>
					</header>
					<form className="n-form n-label-pos:left" onSubmit={handleSubmit}>
						<div>
							<label>
								<span>이름</span>
								<input type="text" name="name" required />
							</label>
						</div>
						<div>
							<label>
								<span>공개유무</span>
								<input
									type="checkbox"
									name="isPublic"
									required
									className="n-toggle flex-grow:0"
								/>
							</label>
						</div>
						<div>
							<label>
								<span>순서</span>
								<input type="text" name="order" required />
							</label>
						</div>

						<div className="fl-dir:row jc:end">
							<button type="submit" className="n-btn n-btn-color:main">
								저장
							</button>
							<a href="detail.html" className="n-btn">
								취소
							</a>
						</div>
					</form>
				</section>
			</section>
		</main>
	);
};

export default EditCategoryPage;

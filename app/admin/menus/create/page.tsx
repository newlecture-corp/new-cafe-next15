"use client";

import Link from "next/link";

export default function MenuCreatePage() {
	return (
		<main>
			<section>
				<header className="n-bar">
					<h1 className="n-heading:5">제품관리 / 메뉴관리</h1>
					<div className="ml:3 d:flex ai:center">
						<Link
							href="../menus"
							className="n-icon n-icon:arrow_back n-btn n-btn:rounded n-btn-size:small"
						>
							추가
						</Link>
					</div>
				</header>

				<section className="n-frame:rounded-shadow">
					<header>
						<h1>
							<span className="n-icon n-icon:post_add n-deco">메뉴등록</span>
						</h1>
					</header>
					<form className="n-form n-label-pos:left">
						<div>
							<label>
								<span>카테고리</span>
								<select>
									<option>커피</option>
									<option>수제청</option>
									<option>샌드위치</option>
									<option>쿠키</option>
								</select>
							</label>
						</div>
						<div>
							<label>
								<span>한글명</span>
								<input type="text" />
							</label>
						</div>
						<div>
							<label>
								<span>영문명</span>
								<input type="text" />
							</label>
						</div>
						<div>
							<label>
								<span>가격</span>
								<input type="text" />
							</label>
						</div>
						<div>
							<label>
								<span>설명</span>
								<textarea></textarea>
							</label>
						</div>
						<div className="fl-dir:row jc:end">
							<button className="n-btn n-btn-color:main">등록</button>
							<Link href="edit.html" className="n-btn n-btn-color:main">
								등록 후 이미지 추가
							</Link>
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

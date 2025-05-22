"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MenuDto } from "@/application/usecases/admin/menu/dto/MenuDto";
import { ImageDto } from "@/application/usecases/admin/menu/dto/ImageDto";
import { fetchWithAuthClient } from "@/lib/fetchWithAuthClient";

export default function MenuEditPage() {
	// 1. 슬러그로 전달된 [id] 값을 얻고,
	const params = useParams();
	const id = params?.id as string;

	// 2. "/api/admin/menus/[id]" 데이터를 패치해서 menu 변수에 담고,
	const [menu, setMenu] = useState<MenuDto | null>(null);
	{
		useEffect(() => {
			if (!id) return;

			const fetchMenu = async () => {
				try {
					const res = await fetch(`/api/admin/menus/${id}`);
					const data = await res.json();
					setMenu(data);
					console.log("menu ================= ", data);
				} catch {
					setMenu(null);
				}
			};

			fetchMenu();
		}, [id]);
	}

	// 3. "/api/admin/menus/[id]/images" 데이터를 패치해서 images 변수에 담는다.
	const [images, setImages] = useState<ImageDto[]>([]);
	{
		useEffect(() => {
			if (!id) return;

			const fetchImages = async () => {
				try {
					const res = await fetchWithAuthClient(
						`/api/admin/menus/${id}/images`
					);
					const data = await res.json();
					console.log("images ================= ", data);

					setImages(data);
				} catch {
					setImages([]);
				}
			};

			fetchImages();
		}, [id]);
	}

	// 4. 메뉴 수정 요청을 처리하기 위한 핸들러를 작성한다.
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!menu || !id) return;
		try {
			const res = await fetchWithAuthClient(`/api/admin/menus/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(menu),
			});
			if (!res.ok) {
				alert("저장에 실패했습니다.");
				return;
			}
			alert("저장되었습니다.");
			// 필요시 페이지 이동 또는 상태 갱신
		} catch {
			alert("저장 중 오류가 발생했습니다.");
		}
	};

	return (
		<main>
			<section className="d:flex flex-direction:column gap:5">
				<header className="n-list">
					<h1 className="n-heading:5">제품관리 / 메뉴수정</h1>
					<div className="ml:3 d:flex ai:center">
						<a
							href="../menus"
							className="n-icon n-icon:arrow_back icon-bd:circle"
						>
							추가
						</a>
					</div>
				</header>

				<section className="n-frame:3 border-radius:0">
					<header className="p:7">
						<h1>
							<span className="n-icon n-icon:edit_square n-deco">메뉴수정</span>
						</h1>
					</header>
					<form className="n-form n-label-pos:left p:7" onSubmit={handleSubmit}>
						<div>
							<label>
								<span>한글명</span>
								<input
									type="text"
									value={menu?.korName ?? ""}
									onChange={(e) =>
										setMenu((menu) =>
											menu ? { ...menu, korName: e.target.value } : null
										)
									}
								/>
							</label>
						</div>
						<div>
							<label>
								<span>영문명</span>
								<input
									type="text"
									value={menu?.engName ?? ""}
									onChange={(e) =>
										setMenu((menu) =>
											menu ? { ...menu, engName: e.target.value } : null
										)
									}
								/>
							</label>
						</div>
						<div>
							<label>
								<span>가격</span>
								<input
									type="text"
									value={menu?.price ?? ""}
									onChange={(e) =>
										setMenu((menu) =>
											menu ? { ...menu, price: Number(e.target.value) } : null
										)
									}
								/>
							</label>
						</div>
						<div>
							<label>
								<span>설명</span>
								<textarea
									value={menu?.description ?? ""}
									onChange={(e) =>
										setMenu((menu) =>
											menu ? { ...menu, description: e.target.value } : null
										)
									}
								></textarea>
							</label>
						</div>
						<div className="fl-dir:row jc:end">
							<button className="n-btn n-btn-color:main">저장</button>
							<a href="detail.html" className="n-btn">
								취소
							</a>
						</div>
					</form>
				</section>

				{/* -- 이미지 추가 프레임-------------------- */}
				<section className="n-frame:3">
					<header className="d:flex flex-direction:column p:7">
						<div className="d:flex">
							<h1 className="n-heading:6">이미지 추가</h1>
							<div className="n-message:error-7 ml:3">
								- 사진이 서버에 저장되었습니다.
							</div>
						</div>
						<div className="h:4 w:100p mt:3 bg-color:main-1a position:relative">
							<div className="w:8p bg-color:main-1 position:absolute text-align:end color:base-1">
								88%
							</div>
							<label className="d:flex h:100p ai:center jc:center">
								<span className="n-icon n-icon:add">사진선택</span>
								<input className="d:none" type="file" />
							</label>
						</div>
					</header>
					<ul className="n-list gap:3 p:7">
						{images.map((image: ImageDto) => (
							<li key={image.id} className="w:3 position:relative">
								<form className="position:absolute right:0 top:0">
									<input type="hidden" value={image.id} />
									<button className="n-icon n-icon:delete n-icon-color:main-1 n-btn:rounded">
										삭제
									</button>
								</form>
								<div className="h:3 w:100p">
									<Image
										src={`/image/product/${image.name}`}
										alt=""
										fill
										style={{ objectFit: "cover" }}
										sizes="100vw"
									/>
								</div>
							</li>
						))}
					</ul>
				</section>
				{/* --/ 이미지 추가 프레임-------------------- */}
			</section>
		</main>
	);
}

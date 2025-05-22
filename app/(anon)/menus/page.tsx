import { GetMenuListDto } from "@/application/usecases/menu/dto/GetMenuListDto";
import styles from "./page.module.scss";
import Image from "next/image";
import FilterForm from "./components/FilterForm";
import Pager from "../components/Pager";
import { Suspense } from "react";
import Loading from "./loading";
import { toggleLike } from "./actions";
import { fetchWithAuthServer } from "@/lib/fetchWithAuthServer";

const {
	["menus-box"]: menusBox,
	menus,
	list,
	["menu-card"]: menuCard,
	["img-box"]: imgBox,
	["menu-info"]: menuInfo,
	price,
	pay,
} = styles;

const List = async ({
	params,
	searchParams,
}: {
	params: Promise<{ params: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
	console.log("=== /menus/page.tsx ===");
	console.log("param object :", await params);
	console.log("query search param object :", await searchParams);

	// ====================================================
	// 사용자 입력 쿼리 전체 이름 매핑
	// ----------------------------------------------------
	const temp = await searchParams;
	const query = {
		page: temp.p,
		categoryId: temp.c,
		searchWord: temp.s,
	};

	// =====================================================
	// url을 동적으로 생성하기 위한 코드
	// -----------------------------------------------------
	let url = `${process.env.NEXT_PUBLIC_API_URL}/menus`;
	{
		const { page, categoryId, searchWord } = query;

		const queryString = [];

		if (page) queryString.push(`p=${page}`);
		if (categoryId) queryString.push(`c=${categoryId}`);
		if (searchWord) queryString.push(`s=${searchWord}`);

		if (queryString.length > 0) {
			url += `?${queryString.join("&")}`;
		}
	}

	console.log("url", url);

	// ====================================================
	// data fetching
	// ----------------------------------------------------
	// 노트 : 이 코드는 서버에서 실행되기 때문에 credentials:"include" 옵션으로 fetch에 쿠키를 포함시킬 수 없음.
	// 왜냐하면 쿠키는 서버에 저장되는 값이 아니며 전달 받는 값이기 때문이다.
	// 따라서 api에 인증 토큰이 필요하다면 클라이언트가 전달한 쿠키를 직접 포함해야 한다.
	let data: GetMenuListDto;
	{
		// const cookieStore = await cookies();
		// const sessionToken = cookieStore.get("next-auth.session-token");

		// const res = await fetch(url, {
		// 	headers: {
		// 		Authorization: `Bearer ${sessionToken?.value}`,
		// 	},
		// });
		// 위의 코드를 /lib/fetchWithAuthServer.ts로 집중화 ==================
		const res = await fetchWithAuthServer(url);
		data = await res.json();
	}

	return (
		<Suspense key={url} fallback={<Loading />}>
			<main>
				<FilterForm query={query} />

				<div className={menusBox}>
					<section className={menus}>
						<h1 className="d:none">메뉴 목록</h1>

						{(data?.menus?.length ?? 0) === 0 ? (
							<div className="n-panel bd w:10 py:9 text-align:center">
								메뉴가 없어요.😇
							</div>
						) : (
							<div className={list}>
								{(data?.menus ?? []).map((m) => (
									<section key={m.id} className={menuCard}>
										<div className={imgBox}>
											<a href={`menus/${m.id}`}>
												<Image
													src={`/image/product/${m.defaultImage}`}
													alt={`${m.korName} 이미지`}
													width={300}
													height={300}
												/>
											</a>
										</div>
										<div className={menuInfo}>
											<h1>
												<a href={`menus/${m.id}`}>{m.korName}</a>
											</h1>
											<h2>{m.engName}</h2>
											<div className={price}>{m.price} 원</div>
											<form action={toggleLike}>
												<input type="hidden" name="menu-id" value={m.id} />
												<button className="n-icon n-icon:favorite">
													좋아요
												</button>
											</form>
											{/* <LikeButton menuId={m.id} like={false} /> */}
											<div className={pay}>
												<button className="n-icon n-icon:shopping_cart icon-bd:circle n-btn-color:main-2">
													장바구니에 담기
												</button>
												<button className="n-icon n-icon:credit_card icon-bd:circle n-btn-color:sub-2">
													주문하기
												</button>
											</div>
										</div>
									</section>
								))}
							</div>
						)}
					</section>
				</div>
				<Pager query={temp} pageSize={8} endPage={data.endPage ?? 0} />
			</main>
		</Suspense>
	);
};

export default List;

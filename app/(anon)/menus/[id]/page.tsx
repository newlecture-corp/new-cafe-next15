import styles from "./page.module.scss";
import Image from "next/image";

const {
	main,
	["menu-detail"]: menuDetail,
	["menu-img-box"]: menuImgBox,
	["menu-order-form"]: menuOrderForm,
	["menu-info"]: menuInfo,
	["radio-group"]: radioGroup,
	["temp-options"]: tempOptions,
	["amount-option"]: amountOption,
	["like-box"]: likeBox,
	["btn-list"]: btnList,
	["btn-back"]: btnBack,
} = styles;

export default function MenuDetailPage() {
	return (
		<>
			<main className={main}>
				<section className={menuDetail}>
					<div className={menuImgBox}>
						<Image
							src={`${
								process.env.NEXT_PUBLIC_SUPABASE_URL
							}/storage/v1/object/public/image/product/${"cafe_latte.svg"}`}
							alt="카페라떼"
							width={500}
							height={500}
						/>
					</div>
					<form className={menuOrderForm}>
						<div className={menuInfo}>
							<h1>카페라떼</h1>
							<h2>Caffe Latte</h2>
							<p>
								카페라떼는 에스프레소에 스팀밀크를 넣은 음료로, 에스프레소의
								쓴맛과 스팀밀크의 부드러움이 어우러져 부드러운 맛을 느낄 수
								있습니다.
							</p>
						</div>
						<fieldset className={`${radioGroup} size-options`}>
							<legend>사이즈</legend>
							<div>
								<label>
									<input
										type="radio"
										name="size"
										value="small"
										defaultChecked
									/>
									Small
								</label>
								<label>
									<input type="radio" name="size" value="large" />
									Large
								</label>
							</div>
						</fieldset>
						<fieldset className={`${radioGroup} ${tempOptions}`}>
							<legend>온도</legend>
							<div>
								<label>
									<input type="radio" name="temp" value="hot" defaultChecked />
									Hot
								</label>
								<label>
									<input type="radio" name="temp" value="ice" />
									Ice
								</label>
							</div>
						</fieldset>
						<fieldset className={amountOption}>
							<legend>수량</legend>
							<div>
								<button
									type="button"
									className="n-icon n-icon:remove n-btn n-btn:rounded n-btn-size:small"
								>
									감소
								</button>
								<label>
									<span className="d:none">수량</span>
									<input type="text" name="amount" defaultValue="1" />
								</label>
								<button
									type="button"
									className="n-icon n-icon:add n-btn n-btn:rounded n-btn-size:small"
								>
									증가
								</button>
							</div>
							<div>45,000 원</div>
						</fieldset>

						<div className={likeBox}>
							<label className="n-icon n-icon:favorite n-icon-size:8">
								좋아요
								<input className="d:none" type="checkbox" value="1" />
							</label>
							<span>12</span>
						</div>

						<div className={btnList}>
							<button type="button" className="n-btn">
								담기
							</button>
							<button type="button" className="n-btn n-btn-color:main">
								주문하기
							</button>
						</div>

						<div className={btnBack}>
							<a
								className="n-icon n-icon:arrow_back n-btn n-btn:rounded n-btn-size:small"
								href="../menus"
							>
								목록
							</a>
						</div>
					</form>
				</section>
			</main>
		</>
	);
}

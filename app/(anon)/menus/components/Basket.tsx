// import { cookies } from "next/headers";
import styles from "./Basket.module.scss";
// import { clearBasket } from "../actions/clearBasket";

// 스타일 모듈을 쉽게 사용하기 위해 destructuring & camel 표기로 매핑
const {
	["basket-box"]: basketBox,
	basket,
	total,
	["amount-box"]: amountBox,
	amount,
	["button-box"]: buttonBox,
	["clear-button"]: clearButton,
} = styles;

// 서버에서 장바구니 데이터를 가져오는 함수
// const getBasketData = async () => {
// 	const cookieStore = await cookies();
// 	const basketCookie = cookieStore.get("basket");
// 	const basket = basketCookie
// 		? JSON.parse(basketCookie.value)
// 		: { items: [], totalAmount: 0, totalPrice: 0 };
// 	return basket;
// };

async function Basket() {
	// const { items, totalAmount, totalPrice } = await getBasketData();
	const items = [
		{
			id: 17,
			kor_name: "치즈 샌드위치",
			eng_name: "cheese sandwich",
			price: 6000,
			has_ice: false,
			created_at: "2025-04-06T05:33:01.690008+00:00",
			updated_at: null,
			deleted_at: null,
			member_id: "e755441d-1979-4617-acd5-531f2f898b22",
			category_id: 3,
			description: null,
			category: { is_public: true },
			image: [{ name: "cheese_sandwich.png", is_default: true }],
		},
		{
			id: 15,
			kor_name: "햄 샌드위치",
			eng_name: "ham sandwich",
			price: 7000,
			has_ice: false,
			created_at: "2025-04-06T05:21:59.682895+00:00",
			updated_at: null,
			deleted_at: null,
			member_id: "e755441d-1979-4617-acd5-531f2f898b22",
			category_id: 3,
			description: null,
			category: { is_public: true },
			image: [{ name: "ham_sandwich.png", is_default: true }],
		},
	]; // 임시 데이터, 실제로는 getBasketData()에서 가져온 데이터 사용
	const totalAmount = items.length;
	const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

	return (
		<div className={basketBox}>
			<section className={basket}>
				<h1>장바구니</h1>
				{items.length > 0 ? (
					<>
						{/* {items.map((item: Menu) => (
              <div key={item.id} className={styles["basket-item"]}>
                <div>
                  <span>{item.korName}</span> - <span>{item.price} 원</span>
                </div>
              </div>
            ))} */}
						<div className={total}>
							<div>금액 : {totalPrice.toLocaleString()} 원</div>
							<div className={amountBox}>
								<span className="price d:none">수량</span>
								<span className={amount}>{totalAmount.toLocaleString()}</span>
							</div>
							<div className={buttonBox}>
								<form>
									<button
										type="submit"
										className={`${clearButton} n-icon n-icon:delete n-icon-color:main-1`}
									>
										장바구니 비우기
									</button>
								</form>
							</div>
						</div>
					</>
				) : (
					<p className="d:flex h:100p ai:center">장바구니가 비어 있습니다.</p>
				)}
			</section>
		</div>
	);
}

export default Basket;

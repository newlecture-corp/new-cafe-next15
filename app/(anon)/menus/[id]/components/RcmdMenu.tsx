import React from "react";
import Image from "next/image";
import styles from "./page.module.scss";
import menuListStyles from "../../page.module.scss";

const {
	["menus-box"]: menusBox,
	menus,
	list,
	["menu-card"]: menuCard,
	["img-box"]: imgBox,
	["menu-info"]: menuInfo,
	price,
	pay,
} = menuListStyles;

const {
	["rcmd-menu-box"]: rcmdMenuBox,
	menus,
	["menu-list"]: menuList,
} = styles;

const RcmdMenu = () => {
	return (
		<div className="menus-box rcmd-menu-box">
			<section className="menus">
				<h1>함께 추천 드리는 메뉴</h1>
				<div className="list">
					{/* Menu Card 1 */}
					<section className="menu-card">
						<div className="img-box">
							<a href="detail.html?id=1">
								<Image
									src="/image/product/americano.png"
									alt="아메리카노 이미지"
									width={100}
									height={100}
								/>
							</a>
						</div>
						<div className="menu-info">
							<h1>
								<a href="detail.html?id=1">아메리카노</a>
							</h1>
							<h2>americano</h2>
							<div className="price">4,000 원</div>
							<div className="like">
								<label className="n-icon n-icon:favorite">
									좋아요
									<input
										className="d:none"
										type="checkbox"
										value="1"
										defaultChecked
									/>
								</label>
								<span>12</span>
							</div>
							<div className="pay">
								<button className="n-icon n-icon:shopping_cart n-btn n-btn:rounded n-btn-color:main">
									장바구니에 담기
								</button>
								<button className="n-icon n-icon:credit_card n-btn n-btn:rounded n-btn-color:sub">
									주문하기
								</button>
							</div>
						</div>
					</section>

					{/* Menu Card 2 */}
					<section className="menu-card">
						<div className="img-box">
							<a href="detail.html?id=1">
								<Image
									src="/image/product/cafe_latte.svg"
									alt="카페라떼 이미지"
									width={100}
									height={100}
								/>
							</a>
						</div>
						<div className="menu-info">
							<h1>
								<a href="detail.html?id=1">카페라떼</a>
							</h1>
							<h2>Cafe Latte</h2>
							<div className="price">4,500 원</div>
							<div className="like">
								<label className="n-icon n-icon:favorite">
									좋아요
									<input className="d:none" type="checkbox" value="1" />
								</label>
								<span>12</span>
							</div>
							<div className="pay">
								<button className="n-icon n-icon:shopping_cart n-btn n-btn:rounded n-btn-color:main">
									장바구니에 담기
								</button>
								<button className="n-icon n-icon:credit_card n-btn n-btn:rounded n-btn-color:sub">
									주문하기
								</button>
							</div>
						</div>
					</section>
				</div>
			</section>
		</div>
	);
};

export default RcmdMenu;

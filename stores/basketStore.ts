import { create } from "zustand";
import { persist } from "zustand/middleware";

// Menu 데이터 타입 정의
export interface Menu {
	id: number;
	korName: string;
	engName: string;
	price: number;
	amount: number;
}

// 장바구니 상태 타입 정의
interface BasketState {
	items: Menu[]; // 장바구니에 담긴 메뉴 배열
	addItem: (item: Menu) => void; // 메뉴 추가
	removeItem: (id: number) => void; // 메뉴 제거
	clearBasket: () => void; // 장바구니 초기화
	totalAmount: () => number;
	totalPrice: () => number;
}

export const useBasketStore = create<BasketState>()(
	persist(
		(set, get) => ({
			items: [], // 초기 상태: 빈 배열
			addItem: (item) => {
				const existingItems = get().items;
				// 중복된 id가 없을 경우 추가
				if (
					!existingItems.some((existingItem) => existingItem.id === item.id)
				) {
					set({ items: [...existingItems, item] });
				} else {
					// 중복된 id가 있을 경우 amount 증가
					set({
						items: existingItems.map((existingItem) =>
							existingItem.id === item.id
								? { ...existingItem, amount: existingItem.amount + 1 }
								: existingItem
						),
					});
				}
			},
			removeItem: (id) => {
				set({
					items: get().items.filter((item) => item.id !== id),
				});
			},
			clearBasket: () => {
				set({ items: [] });
			},
			totalAmount: () => {
				return get().items.reduce((acc, item) => acc + item.amount, 0);
			},
			totalPrice: () => {
				return get().items.reduce(
					(acc, item) => acc + item.price * item.amount,
					0
				);
			},
		}),
		{
			name: "basket-storage", // LocalStorage 키 이름
		}
	)
);

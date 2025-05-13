import { MenuViewCriteria } from "@/domain/repositories/criteria/MenuViewCriteria";
import { MenuViewRepository } from "@/domain/repositories/MenuViewRepository";
import {
	Category,
	Menu,
	MenuImage,
	Prisma,
	PrismaClient,
} from "@/prisma/generated";
import { MenuView } from "@/domain/entities/MenuView";

export class PrMenuViewRepository implements MenuViewRepository {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async count(criteria: MenuViewCriteria): Promise<number> {
		const count = await this.prisma.menu.count({
			where: this.getWhereClause(criteria),
		});
		return count;
	}

	async findAll(criteria: MenuViewCriteria): Promise<MenuView[]> {
		// 조건 객체 디스트럭처링하기
		const { sortField, ascending, offset, limit } = criteria;

		// 정렬 조건 설정하기
		const orderBy = sortField
			? {
					[sortField]: ascending ? "asc" : "desc",
			  }
			: undefined;

		const menus: Menu[] = await this.prisma.menu.findMany({
			where: this.getWhereClause(criteria),
			skip: offset,
			take: limit,
			orderBy,
			include: {
				category: true,
				images: {
					where: {
						isDefault: true,
					},
				},
			},
		});

		// 테스트 용 출력 코드 ====================================
		// console.log("========================== menus:", menus);

		return menus.map((menu: Menu) => {
			const current = menu as Menu & {
				category: Category;
				images: MenuImage[];
			};

			return {
				id: menu.id,
				korName: menu.korName,
				engName: menu.engName,
				price: menu.price,
				categoryId: menu.categoryId,
				createdAt: menu.createdAt,
				updatedAt: menu.updatedAt,
				description: menu.description,
				defaultImage: current.images.length > 0 ? current.images[0].name : "", // Handle case where images array is empty
				likeCount: 0, // Implement like count logic
				likedByMe: false, // Implement liked by me logic
			} as MenuView; // Implement the mapping logic
		}) as MenuView[];
	}

	// 검색 조건 설정하기
	getWhereClause(criteria: MenuViewCriteria): Prisma.MenuWhereInput {
		// 테스트 용 출력 코드 ====================================
		console.log("criteria:", criteria);

		// 조건 객체 디스트럭처링하기
		const { searchWord, categoryId, publicOnly } = criteria;

		return {
			// ⚠️ ...(publicOnly && { 이런 패턴의 연산은 동적 쿼리를 만들기 위한 연산임.
			// ✅ publicOnly가 false일 때는 필터링하지 않음
			...(publicOnly && {
				category: {
					is: {
						is_public: true, // ✅ publicOnly가 true일 때만 필터링
					},
				},
			}),
			...(categoryId && {
				categoryId: parseInt(categoryId, 10),
			}),
			...(searchWord && {
				OR: [
					{
						korName: {
							contains: searchWord,
						},
					},
					{
						engName: {
							contains: searchWord,
							mode: "insensitive",
						},
					},
				],
			}),
		};
	}
}

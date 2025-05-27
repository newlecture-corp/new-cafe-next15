import {
	Category,
	Menu,
	MenuImage,
	Prisma,
	PrismaClient,
} from "@/prisma/generated";
import { MenuView } from "@/domain/entities/admin/MenuView";
import { MenuRepository } from "@/domain/repositories/admin/MenuRepository";
import { MenuViewCriteria } from "@/domain/repositories/criteria/admin/MenuViewCriteria";

export class PrMenuRepository implements MenuRepository {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient({
			// log: ["query"], // prisma가 생성한 쿼리를 콘솔에 출력하기 위한 옵션
		});
	}

	// 조건에 부합하는 데이터 개수를 세는 메서드
	async count(criteria: MenuViewCriteria): Promise<number> {
		// 필터 조건 설정하기
		const where: Prisma.MenuWhereInput = this.getWhereClause(criteria);

		// 데이터 가져오기
		const count: number = await this.prisma.menu.count({
			where,
		});
		return count;
	}

	async findByIdWithImages(id: number): Promise<Menu | null> {
		const menu = await this.prisma.menu.findUnique({
			where: { id },
			include: {
				// category: true,
				images: true,
			},
		});

		if (!menu) return null;

		const current = menu as Menu & {
			// category: Category;
			images: MenuImage[];
		};

		return {
			...current,
		} as Menu;
	}

	// 조건에 부합하는 데이터 목록을 가져오는 메서드
	async findViewAll(criteria: MenuViewCriteria): Promise<MenuView[]> {
		// 1. 쿼리 조건을 디스트럭처링 해서
		const { sortField, ascending, offset, limit } = criteria;

		// 2. 필터 조건을을 설정하고
		const where: Prisma.MenuWhereInput = this.getWhereClause(criteria);

		// 2-1. 페이지네이션 조건 설정하기
		const skip: number = offset;
		const take: number = limit;

		// 2-2. 정렬 조건 설정하기
		const orderBy: object | undefined = sortField
			? {
					[sortField]: ascending ? "asc" : "desc",
			  }
			: undefined;

		// 3. 쿼리를 실행한 후에
		const menus: Menu[] = await this.prisma.menu.findMany({
			where,
			skip,
			take,
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
		// console.log(
		// 	"PrAdminMenuViewRepository ========================== menus:",
		// 	menus
		// );

		// 4. MenuView로 변환해서
		const menuViews: MenuView[] = menus.map((menu: Menu) => {
			const current = menu as Menu & {
				category: Category;
				images: MenuImage[];
			};

			// 목록의 각 항목을 MenuView로 변환하기
			return {
				id: menu.id,
				korName: menu.korName,
				engName: menu.engName,
				price: menu.price,
				categoryId: menu.categoryId,
				createdAt: menu.createdAt,
				updatedAt: menu.updatedAt,
				description: menu.description,
				defaultImage: current.images.length > 0 ? current.images[0].name : "",
			} as MenuView;
		}) as MenuView[];

		// 5. MenuView[]로 반환하기
		return menuViews;
	}

	// @ 검색 조건을 갖는 CategoryViewCriteria를 받아서
	// Prisma.CategoryWhereInput으로 변환해서 변환하는 메소드
	getWhereClause(criteria: MenuViewCriteria): Prisma.MenuWhereInput {
		// 1. 쿼리 조건을 디스트럭처링해서서
		const { searchWord, categoryId } = criteria;

		// 2. Prisma에서 사용하는 쿼리 조건으로 변환하기
		return {
			// ⚠️ ...(categoryId && { 이런 패턴의 연산은 동적 쿼리를 만들기 위한 연산이다.
			// ✅ categoryId의 값이 false일 때는 필터링에서 빠진다.
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

	async save(menu: Menu): Promise<Menu> {
		return this.prisma.menu.create({
			data: menu,
		});
	}

	async update(menu: Menu): Promise<Menu> {
		return this.prisma.menu.update({
			where: { id: menu.id },
			data: menu,
		});
	}

	async deleteById(id: number): Promise<void> {
		await this.prisma.menu.delete({
			where: { id },
		});
	}
}

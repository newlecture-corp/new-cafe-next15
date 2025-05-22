import { MenuView } from "@/domain/entities/MenuView";
import { MenuViewCriteria } from "@/domain/repositories/criteria/MenuViewCriteria";
import { MenuRepository } from "@/domain/repositories/MenuRepository";
import {
	Category,
	Menu,
	MenuImage,
	Prisma,
	PrismaClient,
} from "@/prisma/generated";

export class PrMenuRepository implements MenuRepository {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	// 조건에 부합하는 데이터 개수를 세는 메서드
	async count(criteria: MenuViewCriteria): Promise<number> {
		// 필터 조건 설정하기
		const where: Prisma.MenuWhereInput = this.getWhereClause(criteria);

		// 데이터 가져오기기
		const count: number = await this.prisma.menu.count({
			where,
		});
		return count;
	}

	// 조건에 부합하는 데이터 목록을 가져오는 메서드
	async findAll(criteria: MenuViewCriteria): Promise<MenuView[]> {
		// 쿼리 조건을 디스트럭처링하기
		const { sortField, ascending, offset, limit } = criteria;

		// 필터 조건 설정하기
		const where: Prisma.MenuWhereInput = this.getWhereClause(criteria);

		// 페이지네이션 조건 설정하기
		const skip: number = offset;
		const take: number = limit;

		// 정렬 조건 설정하기
		const orderBy: object | undefined = sortField
			? {
					[sortField]: ascending ? "asc" : "desc",
			  }
			: undefined;

		// 데이터 가져오기
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
		// console.log("========================== menus:", menus);

		// 메뉴 목록을 MenuView[]로 변환하기
		return menus.map((menu: Menu) => {
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
				defaultImage: current.images.length > 0 ? current.images[0].name : "", // Handle case where images array is empty
				likeCount: 0,
				likedByMe: false,
			} as MenuView;
		}) as MenuView[];
	}

	async findByIdWithImages(id: number): Promise<Menu> {
		const menu: Menu =
			(await this.prisma.menu.findUniqueOrThrow({
				where: { id },
				include: {
					images: true,
				},
			})) || null;

		// console.log("========= PrMenuRepository.findByIdWithImages =======");
		// console.log("menu", menu);
		// console.log("=============================================");

		return menu;
	}

	async findById(id: number): Promise<Menu> {
		return (
			this.prisma.menu.findUniqueOrThrow({
				where: { id },
			}) || null
		);
	}

	// 검색 조건 설정하기
	getWhereClause(criteria: MenuViewCriteria): Prisma.MenuWhereInput {
		// 쿼리 조건을 디스트럭처링하기
		const { searchWord, categoryId, publicOnly } = criteria;

		return {
			// ⚠️ ...(publicOnly && { 이런 패턴의 연산은 동적 쿼리를 만들기 위한 연산임.
			// ✅ publicOnly가 false일 때는 필터링하지 않음
			...(publicOnly && {
				category: {
					is: {
						isPublic: true, // ✅ publicOnly가 true일 때만 필터링
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

import { CategoryView } from "@/domain/entities/admin/CategoryView";
import { CategoryRepository } from "@/domain/repositories/admin/CategoryRepository";
import { CategoryViewCriteria } from "@/domain/repositories/criteria/admin/CategoryViewCriteria";
import { Category, Menu, Prisma, PrismaClient } from "@/prisma/generated";

export class PrCategoryRepository implements CategoryRepository {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	// @ 조건에 부합하는 데이터 개수를 세는 메서드
	async count(criteria?: CategoryViewCriteria): Promise<number> {
		// 1. 필터 조건 설정하고
		const where: Prisma.CategoryWhereInput = this.getWhereClause(criteria);

		// 2. 쿼리를 실행하여 데이터의 개수 반환한다.
		return this.prisma.category.count({ where });
	}

	// @ 조건에 부합하는 데이터 목록을 반환하는 메소드
	async findViewAll(criteria?: CategoryViewCriteria): Promise<CategoryView[]> {
		// 1. 쿼리 조건을 디스트럭처링해서
		const { sortField, ascending, offset, limit } = criteria ?? {};

		// 2. 필터 조건을 설정하고
		const where: Prisma.CategoryWhereInput = this.getWhereClause(criteria);

		// 2-1. 페이지네이션 조건 설정하기
		const skip: number | undefined = offset;
		const take: number | undefined = limit;

		// 2-2. 정렬 조건 설정
		let orderBy: Prisma.CategoryOrderByWithRelationInput | undefined =
			undefined;
		if (sortField) {
			orderBy = {
				[sortField]: ascending === false ? "desc" : "asc",
			};
		}

		// 3. 쿼리를 실행한 후에에
		const categories = (await this.prisma.category.findMany({
			where,
			skip,
			take,
			orderBy,
			include: { menus: true },
		})) as (Category & { menus: Menu[] })[];

		// 5. CategoryView로 변환
		const categoryViews: CategoryView[] = categories.map(
			(category) =>
				({
					...category,
					menuCount: category.menus.length,
				} as CategoryView)
		);

		return categoryViews;
	}

	// @ 식별자에 부합하는 데이터 하나를 반환하는 메소드
	async findById(id: number): Promise<Category | null> {
		// 1. id로 Category를 찾아서 반환한다.
		return this.prisma.category.findUnique({
			where: { id },
		});
	}

	// @ Category를 저장하는 메소드
	async save(category: Category): Promise<Category> {
		// 1. Category를 저장하고 저장된 Category를 반환한다.
		return this.prisma.category.create({
			data: category,
		});
	}

	// @ Category를 수정하는 메소드
	async update(category: Category): Promise<Category> {
		return this.prisma.category.update({
			where: { id: category.id },
			data: category,
		});
	}

	// @ 식별자에 부합하는 Category를 삭제하는 메소드
	async deleteById(id: number): Promise<void> {
		await this.prisma.category.delete({
			where: { id },
		});
	}

	// @ 검색 조건을 갖는 CategoryViewCriteria를 받아서
	// Prisma.CategoryWhereInput으로 변환해서 변환하는 메소드
	getWhereClause(criteria?: CategoryViewCriteria): Prisma.CategoryWhereInput {
		if (!criteria) return {};

		const { name, includeAll, includeMenu } = criteria;

		const where: Prisma.CategoryWhereInput = {};

		// 이름 필터링
		if (name) {
			where.name = {
				contains: name,
				mode: "insensitive",
			};
		}

		// includeAll이 false일 때만 활성화 (예시: 비활성화된 카테고리 제외)
		if (includeAll === false) {
			where.isPublic = true;
		}

		// includeMenu가 true일 때만 메뉴가 1개 이상인 카테고리만
		if (includeMenu === true) {
			where.menus = {
				some: {},
			};
		}

		// sortField, ascending, offset, limit은 where 조건이 아니라 findMany 옵션에 사용됨
		// 따라서 여기서는 처리하지 않음

		return where;
	}
}

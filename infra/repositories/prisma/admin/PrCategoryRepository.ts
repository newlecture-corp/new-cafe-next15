import { CategoryView } from "@/domain/entities/admin/CategoryView";
import { CategoryRepository } from "@/domain/repositories/admin/CategoryRepository";
import { CategoryViewCriteria } from "@/domain/repositories/criteria/admin/CategoryViewCriteria";
import { Category, Prisma, PrismaClient } from "@/prisma/generated";

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
		// 1. 필터 조건 설정하고
		const where: Prisma.CategoryWhereInput = this.getWhereClause(criteria);

		// 2. 쿼리를 실행한 후에
		const categories = await this.prisma.category.findMany({
			where,
			include: { menus: true },
		});

		// 3. CategoryView로 변환해서
		const categoryViews: CategoryView[] = categories.map(
			(category) =>
				({
					...category,
					menuCount: category.menus.length,
				} as CategoryView)
		) as CategoryView[];

		// 4. CategoryView[]로 반환하기
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
		// 쿼리 조건을 디스트럭처링하기
		const { name } = criteria || {};

		return {
			...(name && {
				name: {
					contains: name,
					mode: "insensitive",
				},
			}),
		};
	}
}

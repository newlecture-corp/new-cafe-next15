// import Input from "@/app/components/Input";
import styles from "./FilterForm.module.scss";
import { CategoryDto } from "@/application/usecases/admin/category/dto/CategoryDto";
import Link from "next/link";

type FilterFormProps = {
	query: {
		categoryId: string | string[] | undefined;
		searchWord: string | string[] | undefined;
	};
};

const FilterForm = async ({ query }: FilterFormProps) => {
	const currentCategory = query.categoryId || "";

	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
		cache: "force-cache",
		next: { revalidate: 60 * 60 },
	});

	console.log("==== res: ", process.env.NEXT_PUBLIC_API_URL);

	const data = await res.json();
	const categories: CategoryDto[] = data.categories;

	return (
		<div className={styles["menu-filter-box"]}>
			<section className={styles["search-form"]}>
				<h1 className="d:none">Menu Filter Panel</h1>
				<h2>NCafe Menu</h2>
				<form action="/menus" method="get">
					{/* <Input /> */}
					<input type="text" name="s" placeholder="검색어를 입력하세요." />
					<button type="submit" className="n-icon n-icon:search">
						검색
					</button>
				</form>
			</section>
			<section className={styles["category-menu"]}>
				<h1>카테고리 메뉴</h1>
				<ul className={styles["category-list"]}>
					<li className={!currentCategory ? styles["active"] : ""}>
						<Link href="menus">전체</Link>
					</li>
					{categories.map((category) => (
						<li
							key={category.id}
							className={
								currentCategory === String(category.id) ? styles["active"] : ""
							}
						>
							<Link href={`menus?c=${category.id}`}>{category.name}</Link>
						</li>
					))}
				</ul>
			</section>
		</div>
	);
};

export default FilterForm;

import Link from "next/link";

export default function Page() {
	return (
		<div className="d:flex flex-direction:column jc:center ai:center h:100p">
			<h1>CSR로 만드는 1차 프로젝트 샘플</h1>
			<div>이해를 위해 기본적인 코드만 포함 : 캐싱, Loading 처리 등은 생략</div>
			<p>
				<Link href="/admin/menus" className="fs:9 color:main-1">
					[메뉴 관리 페이지로 이동]
				</Link>
			</p>
		</div>
	);
}

import Link from "next/link";

export default function Page() {
	return (
		<div className="d:flex flex-direction:column jc:center ai:center h:100p gap:2">
			<h1>CSR로 만드는 1차 프로젝트 샘플</h1>
			<div>이해를 위해 기본적인 코드만 포함 : 캐싱, Loading 처리 등은 생략</div>
			<div>
				<Link href="/admin/menus" className="fs:9 color:main-1">
					[메뉴 관리 페이지로 이동]
				</Link>
			</div>
			<div className="mt:3 d:flex flex-direction:column ai:center gap:1">
				<div>관리자 계정 (사용자 아이디 : newlec, 비밀번호: 111)</div>
				<div>일반회원 계정 (사용자 아이디 : dragon, 비밀번호: 111)</div>
			</div>
		</div>
	);
}

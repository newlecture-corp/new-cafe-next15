import React from "react";
import Link from "next/link";

export default function AdminAside() {
  return (
    <aside className="">
      <header className="n-aside-menu">
        <h1 className="d:none">
          <Link href="">관리자 메뉴</Link>
        </h1>
        <ul>
          <li className="">
            <Link
              className="n-icon n-icon:dashboard n-deco n-deco-pos:top lg:n-deco-pos:left"
              href="/admin"
            >
              대시보드
            </Link>
          </li>
        </ul>
      </header>
      <nav className="n-aside-menu">
        <h1>재품관리</h1>
        <ul>
          <li className="active">
            <Link
              className="n-icon n-icon:local_cafe n-deco n-deco-pos:top lg:n-deco-pos:left"
              href="/admin/menus"
            >
              메뉴관리
            </Link>
          </li>
          <li>
            <Link
              className="n-icon n-icon:garage_home n-deco n-deco-pos:top lg:n-deco-pos:left"
              href="/admin/supplies"
            >
              비품관리
            </Link>
          </li>
        </ul>
      </nav>
      <nav className="n-aside-menu">
        <h1>고객관리</h1>
        <ul>
          <li>
            <Link
              className="n-icon n-icon:notifications n-deco n-deco-pos:top lg:n-deco-pos:left"
              href="/admin/notices"
            >
              공지관리
            </Link>
          </li>
          <li>
            <Link
              className="n-icon n-icon:group n-deco n-deco-pos:top lg:n-deco-pos:left"
              href="/admin/members"
            >
              회원관리
            </Link>
          </li>
        </ul>
      </nav>
      <nav className="n-aside-menu">
        <h1>통계관리</h1>
        <ul>
          <li>
            <Link
              className="n-icon n-icon:cardio_load n-deco n-deco-pos:top lg:n-deco-pos:left"
              href=""
            >
              좋아요
            </Link>
          </li>
          <li>
            <Link
              className="n-icon n-icon:bookmarks n-deco n-deco-pos:top lg:n-deco-pos:left"
              href=""
            >
              찜목록
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

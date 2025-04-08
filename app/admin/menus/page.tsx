"use client"; // 이 컴포넌트는 클라이언트 사이드에서 렌더링됩니다.
import { MenuDto } from '@/application/usecases/admin/menu/dto/MenuDto'; // MenuDto 타입을 가져옵니다.
import { useEffect, useState } from 'react'; // React의 useEffect와 useState 훅을 가져옵니다.
import Image from 'next/image'; // Next.js의 최적화된 이미지 컴포넌트를 가져옵니다.
import { useSearchParams } from 'next/navigation'; // URL의 쿼리 파라미터를 가져오는 훅입니다.
import Link from 'next/link'; // Next.js의 클라이언트 사이드 네비게이션 컴포넌트입니다.
import { CategoryDto } from '@/application/usecases/admin/category/dto/CategoryDto';

export default function MenuListPage() {
    console.log("page loaded"); // 페이지가 로드되었음을 콘솔에 출력합니다.
    // 컴포넌트 시작
    const searchParams = useSearchParams(); // URL에서 쿼리 파라미터를 가져옵니다.
    const pageParam = searchParams.get('p') || '1'; // 'p' 파라미터를 가져오거나 기본값 '1'을 사용합니다.
    const searchWordParam = searchParams.get('q') || ''; // 'q' 파라미터를 가져오거나 기본값 ''을 사용합니다.
    const categoryIdParam = searchParams.get('c') || ''; // 'c' 파라미터를 가져오거나 기본값 ''을 사용합니다.    

    // 상태 관리변수
    // - param 상태변수들
    const [searchWord, setSearchWord] = useState<string>(searchWordParam); // 검색어를 저장하는 상태입니다.
    const [categoryId, setCategoryId] = useState<string>(categoryIdParam); // 카테고리 ID를 저장하는 상태입니다.    
    // - DTO 상태변수들
    const [categories, setCategories] = useState<CategoryDto[]>([]); // 카테고리 데이터를 저장하는 상태입니다.
    const [menus, setMenus] = useState<MenuDto[]>([]); // 메뉴 데이터를 저장하는 상태입니다.
    const [totalCount, setTotalCount] = useState<number>(0); // 총 메뉴 개수를 저장하는 상태입니다.    
    const [currentPage, setCurrentPage] = useState<number>(parseInt(pageParam, 10)); // 현재 페이지를 저장하는 상태입니다.    
    const [pages, setPages] = useState<number[]>([]); // 페이지 목록을 저장하는 상태입니다.
    const [hasNextPage, setHasNextPage] = useState<boolean>(false); // 다음 페이지 여부를 저장하는 상태입니다.
    const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false); // 이전 페이지 여부를 저장하는 상태입니다.

    // 메뉴 데이터를 가져오는 useEffect 훅
    useEffect(() => {
        console.log("useEffect called"); // useEffect가 호출되었음을 콘솔에 출력합니다.
        const fetchMenus = async () => {            
            try {
                // URLSearchParams 객체를 생성합니다.
                const params = new URLSearchParams();

                // 쿼리 파라미터를 추가합니다.
                params.append('p', currentPage.toString());
                if (searchWord) params.append('sw', searchWord);
                if (categoryId) params.append('c', categoryId);

                // API 호출
                const response = await fetch(`/api/admin/menus?${params.toString()}`);
                const data = await response.json();

                // 상태 업데이트                
                setCategories(data.categories); // 카테고리 상태 업데이트
                setMenus(data.menus);
                setTotalCount(data.totalCount);
                setPages(data.pages); // 페이지 목록 상태 업데이트
                setHasNextPage(data.hasNextPage); // 다음 페이지 여부 상태 업데이트
                setHasPreviousPage(data.hasPreviousPage); // 이전 페이지 여부 상태 업데이트
            } catch (error) {
                console.error('Failed to fetch menus:', error); // 에러 발생 시 로그를 출력합니다.
            }
        };

        // 메뉴 데이터를 가져오는 함수를 호출합니다.
        fetchMenus();

        // 의존성 배열에 상태 변수를 추가합니다.
    }, [currentPage, searchWord, categoryId]);

    
    // 검색 폼 제출 핸들러
    const searchSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        console.log("searchSubmitHandler called"); // 검색 제출 핸들러가 호출되었음을 콘솔에 출력합니다.
        e.preventDefault(); // 기본 폼 제출 동작을 막습니다.
        const formData = new FormData(e.currentTarget);
        const searchWordValue = formData.get('sw') as string;
        const categoryIdValue = formData.get('category') as string;

        console.log('queryValue:', searchWordValue); // 검색어
        console.log('categoryIdValue:', categoryIdValue); // 카테고리 ID

        setCurrentPage(1); // 페이지를 1로 초기화합니다.
        setSearchWord(searchWordValue); // 검색어 상태를 업데이트합니다.
        setCategoryId(categoryIdValue); // 선택된 카테고리 ID를 상태로 설정합니다.
    };

    return (
        <main>
            <section>
                <header className="n-bar">
                    <h1 className="n-heading:5">제품관리 / 메뉴관리</h1> {/* 페이지 제목 */}
                    <div className="ml:3 d:flex">
                        <Link
                            href="menus/create"
                            className="n-icon n-icon:add n-btn n-btn:rounded n-btn-size:small"
                        >
                            추가 {/* 메뉴 추가 버튼 */}
                        </Link>
                    </div>
                </header>

                <section className="n-frame:rounded-shadow">
                    <header>
                        <h1>
                            <span className="n-icon n-icon:search n-deco">검색</span> {/* 검색 아이콘 */}
                        </h1>
                        <div className="ml:auto">
                            <label className="n-icon n-icon:arrow_drop_down cursor:pointer">
                                <span>확장버튼</span> {/* 확장 버튼 */}
                                <input className="d:none n-panel-expander" type="checkbox" />
                            </label>
                        </div>
                    </header>
                    <form className="n-form n-label-pos:left" onSubmit={searchSubmitHandler}>
                        <div>
                            <label>
                                <span>한글명</span> {/* 한글명 입력 필드 */}
                                <input type="text" name="sw" defaultValue={searchWord} />
                            </label>
                            <label>
                                <span>카테고리</span> {/* 카테고리 선택 필드 */}
                                <select
                                    name="category"
                                    defaultValue={categoryId}
                                >
                                    <option value="">전체</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <div className="d:flex justify-content:end">
                                <button className="n-btn n-btn-color:main" type="submit">검색</button> {/* 검색 버튼 */}
                                <button className="n-btn ml:1" type="reset">취소</button> {/* 취소 버튼 */}
                            </div>
                        </div>
                    </form>
                </section>

                <section className="n-frame:rounded-shadow">
                    <header>
                        <h1 className="d:none2">
                            <span className="n-icon n-icon:view_list n-deco n-deco-gap:2">
                                메뉴목록
                            </span>
                        </h1>
                        <div>
                            <span className="ml:1 n-heading:6">({totalCount})</span>
                        </div>
                    </header>

                    <table className="n-table n-table:expandable">
                        <thead>
                            <tr>
                                <th className="w:1">번호</th>
                                <th className="w:0 md:w:2 overflow:hidden">사진</th>
                                <th>한글명</th>
                                <th className="w:0 md:w:2 n-heading-truncate">영문명</th>
                                <th className="w:3">비고</th>
                            </tr>
                        </thead>

                        {menus.length === 0 && (
                            <tbody>
                                <tr>
                                    <td colSpan={5} className="text-align:center">
                                        🍔🍕🍣 아직! 찾는 메뉴가 없어요 😢
                                    </td>
                                </tr>
                            </tbody>
                        )}

                        {menus.map((menu) => (
                        <tbody key={menu.id}>
                                <tr className="vertical-align:middle">
                                    <td>
                                        {menu.id}
                                    </td>                                    
                                    <td className="w:0 md:w:2 overflow:hidden">
                                        <Image 
                                            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/image/product/${menu.defaultImage}`} // Supabase 이미지 URL
                                            alt={menu.korName} 
                                            width={50} 
                                            height={50} 
                                        />
                                        

                                    </td>
                                    <td className="text-align:start n-heading-truncate">
                                        <Link href="detail.html">{menu.korName}</Link> {/* 메뉴 상세 링크 */}
                                    </td>
                                    <td className="w:0 md:w:2 n-heading-truncate">{menu.engName}</td>
                                    <td>
                                        <span className="d:inline-flex align-items:center">
                                            <label className="n-icon n-icon:arrow_drop_down n-icon-size:2 n-btn mr:2">
                                                <input
                                                    type="checkbox"
                                                    className="d:none n-row-expander" />
                                                <span>상세보기</span> {/* 상세보기 버튼 */}
                                            </label>
                                            <Link
                                                className="n-icon n-icon:edit_square n-icon-color:base-6"
                                                href="detail.html"
                                            >
                                                수정 {/* 수정 버튼 */}
                                            </Link>
                                            <form className="d:flex ai:center">
                                                <input type="hidden" name="id" value="1" />
                                                <button
                                                    className="n-icon n-icon:delete n-icon-color:base-6"
                                                    type="submit"
                                                >
                                                    삭제 {/* 삭제 버튼 */}
                                                </button>
                                            </form>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={5}>
                                        <section>
                                            <h1 className="d:none">상세내용</h1>
                                            <dl className="n-list:dash-lined">
                                                <div>
                                                    <dt>영문명</dt>
                                                    <dd className="ml:1">{menu.engName}</dd>
                                                </div>
                                                <div>
                                                    <dt>사진</dt>
                                                    <dd className="ml:1">
                                                        <ul className="n-bar flex-wrap:wrap">
                                                            {menu.images.map((image) => (
                                                                <li key={image.id} className={image.isDefault ? "active:border" : ""}>                                                                    
                                                                    <Image
                                                                        className="w:4 h:auto"
                                                                        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/image/product/${image.name}`}
                                                                        alt={menu.korName}
                                                                        width={100}
                                                                        height={100}
                                                                    />
                                                                </li>
                                                            ))}                                                            
                                                        </ul>
                                                    </dd>
                                                </div>
                                                <div>
                                                    <dt>가격</dt>
                                                    <dd className="ml:1">{menu.price.toLocaleString()}원</dd>
                                                </div>
                                                <div>
                                                    <dt>등록일자</dt>
                                                    <dd className="ml:1">
                                                        {new Date(menu.createdAt).toLocaleString('ko-KR', {
                                                            year: 'numeric',
                                                            month: '2-digit',
                                                            day: '2-digit',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            second: '2-digit',
                                                        })}
                                                    </dd>
                                                </div>
                                            </dl>
                                        </section>
                                    </td>
                                </tr>                                
                        </tbody>
                        ))}
                    </table>
                    <div className="mt:4 text-align:center">
                        {/* 페이지네이션 컴포넌트 */}
                        <section className="d:flex jc:center ai:center gap:2 h:100p">
                            <h1 className="d:none">페이저</h1>
                            {hasPreviousPage ? (
                                <button
                                    className="n-btn"
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                >
                                    이전
                                </button>
                            ) : (
                                <div className="n-btn disabled">이전</div>
                            )}
                            <ul className="n-bar">
                                {pages.map((pageNumber) => (
                                    <li key={pageNumber}>
                                        <button
                                            className={`n-btn ${pageNumber === currentPage ? 'active' : ''}`}
                                            onClick={() => setCurrentPage(pageNumber)}
                                        >
                                            {pageNumber} {/* 페이지 번호 */}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            {hasNextPage ? (
                                <button
                                    className="n-btn"
                                    onClick={() => setCurrentPage((prev) => prev + 1)}
                                >
                                    다음
                                </button>
                            ) : (
                                <div className="n-btn disabled">다음</div>
                            )}
                        </section>
                    </div>
                </section>
            </section>
        </main>
    );
}

export default function AdminMenusPage() {
  return (
    <main>
      <section>
        <header className="n-bar">
          <h1 className="n-heading:5">제품관리 / 메뉴관리</h1>
          <div className="ml:3 d:flex">
            <a
              href="reg.html"
              className="n-icon n-icon:add n-btn n-btn:rounded n-btn-size:small"
            >
              추가
            </a>
          </div>
        </header>

        <section className="n-frame:rounded-shadow">
          <header>
            <h1>
              <span className="n-icon n-icon:search n-deco">검색</span>
            </h1>
            <div className="ml:auto">
              <label className="n-icon n-icon:arrow_drop_down cursor:pointer">
                <span>확장버튼</span>
                <input className="d:none n-panel-expander" type="checkbox" />
              </label>
            </div>
          </header>
          <form className="n-form n-label-pos:left">
            <div>
              <label>
                <span>한글명</span>
                <input type="text" />
              </label>
              <div className="d:flex justify-content:end">
                <button className="n-btn n-btn-color:main">검색</button>
                <button className="n-btn ml:1">취소</button>
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
              <span className="ml:1 n-heading:6">(2)</span>
            </div>
          </header>

          <table className="n-table n-table:expandable">
            <thead>
              <tr>
                <th className="w:1">번호</th>
                <th className="w:0 overflow:hidden">사진</th>
                <th>한글명</th>
                <th className="w:0 md:w:2 n-heading-truncate">영문명</th>
                <th className="w:3">비고</th>
              </tr>
            </thead>
            <tbody>
              <tr className="vertical-align:middle">
                <td>2</td>
                <td className="w:0 overflow:hidden">
                  <img src="" alt="menu" />
                </td>
                <td className="text-align:start n-heading-truncate">
                  <a href="detail.html">카페라떼</a>
                </td>
                <td className="w:0 md:w:2 n-heading-truncate">Cafe Latte</td>
                <td>
                  <span className="d:inline-flex align-items:center">
                    <label className="n-icon n-icon:arrow_drop_down n-icon-size:2 n-btn mr:2">
                      <input
                        type="checkbox"
                        className="d:none n-row-expander"
                      />
                      <span>상세보기</span>
                    </label>
                    <a
                      className="n-icon n-icon:edit_square n-icon-color:base-6"
                      href="detail.html"
                    >
                      수정
                    </a>
                    <form className="d:flex ai:center">
                      <input type="hidden" name="id" value="1" />
                      <button
                        className="n-icon n-icon:delete n-icon-color:base-6"
                        type="submit"
                      >
                        삭제
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
                        <dd className="ml:1">Cafe Latte</dd>
                      </div>
                      <div>
                        <dt>사진</dt>
                        <dd className="ml:1">
                          <ul className="n-bar flex-wrap:wrap">
                            <li>
                              <img
                                className="w:4"
                                src="/image/product/americano.png"
                                alt="americano"
                              />
                            </li>
                            <li className="active:border">
                              <img
                                className="w:4"
                                src="/image/product/espresso.svg"
                                alt="espresso"
                              />
                            </li>
                          </ul>
                        </dd>
                      </div>
                      <div>
                        <dt>가격</dt>
                        <dd className="ml:1">1,000원</dd>
                      </div>
                      <div>
                        <dt>등록일자</dt>
                        <dd className="ml:1">2024-12-25 12:00:00</dd>
                      </div>
                    </dl>
                  </section>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td className="w:0 overflow:hidden">
                  <img src="" alt="menu" />
                </td>
                <td className="text-align:start">아메리카노</td>
                <td className="w:0 md:w:2 n-heading-truncate">Americano</td>
                <td>
                  <span className="d:inline-flex align-items:center">
                    <label className="n-icon n-icon:arrow_drop_down n-icon-size:2 n-btn mr:2">
                      <input
                        type="checkbox"
                        className="d:none n-row-expander"
                      />
                      <span>상세보기</span>
                    </label>
                    <a
                      className="n-icon n-icon:edit_square n-icon-color:base-6"
                      href="edit.html"
                    >
                      수정
                    </a>
                    <form className="d:flex ai:center">
                      <input type="hidden" name="id" value="1" />
                      <button
                        className="n-icon n-icon:delete n-icon-color:base-6"
                        type="submit"
                      >
                        삭제
                      </button>
                    </form>
                  </span>
                </td>
              </tr>
              <tr>
                <td colSpan={5}>
                  asdasdfasdfasfda asdf a sdf asdf asdf asdf asd fsad d adsf as
                  adfs af
                  <br />
                  asda asdf asdf asdf asdf asd as asdf f
                  <br />
                  asdf
                  <br />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt:4 text-align:center">
            <ul className="n-bar">
              <li>
                <a className="n-btn active" href="">
                  1
                </a>
              </li>
              <li>
                <a className="n-btn" href="">
                  2
                </a>
              </li>
              <li>
                <a className="n-btn" href="">
                  3
                </a>
              </li>
              <li>
                <a className="n-btn" href="">
                  4
                </a>
              </li>
              <li>
                <a className="n-btn" href="">
                  5
                </a>
              </li>
            </ul>
          </div>
        </section>
      </section>
    </main>
  );
}
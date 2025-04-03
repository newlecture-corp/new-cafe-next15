import React, { JSX } from 'react';

const MenuPage = async ({ params }: { params: { id: string } }): Promise<JSX.Element> => {
  const { id } = params;


    const res = await fetch(`https://next15-ts-ssr.new-cafe.com/api/menus`, {
      cache: 'no-store',
    });

    const data = await res.json();
    console.log('data', data); 

  return (
    <main>
      <h1>상세페이지 {id}</h1>
      <div>
        {data.menus[1].korName}
      </div>
    </main>
  );
};

export default MenuPage;
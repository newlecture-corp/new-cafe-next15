
import React, { FC, JSX } from 'react';

type MenuPageParams = {
  params: {
    id: string;
  };
};

const MenuPage: FC<MenuPageParams> = ({ params }): JSX.Element => {
  const { id } = params;
  return (
    <main>
    상세페이지 {id}
    </main>
  );
};

export default MenuPage;
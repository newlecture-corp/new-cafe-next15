import { CategoryDto } from '../../category/dto/CategoryDto';
import { MenuDto } from './MenuDto';

export class MenuListDto {
    constructor(
        public categories: CategoryDto[],
        public menus: MenuDto[],
        
        public totalCount: number,
        public endPage: number,
        public hasPreviousPage: boolean,
        public hasNextPage: boolean,
        public pages: number[]
    ) {}
}

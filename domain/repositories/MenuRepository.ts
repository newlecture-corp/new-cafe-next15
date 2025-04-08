import { Menu } from "../entities/Menu";

export interface MenuRepository {
  count(searchWord: string, categoryId: string | null): Promise<number>;
  findById(id:number): Promise<Menu>;
  findAll(searchWord: string, categoryId: string | null, offset: number, limit: number): Promise<Menu[]>;
  save(menu:Menu): Promise<Menu>;
}
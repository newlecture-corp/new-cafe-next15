import { Image } from "../entities/Image";

export interface ImageRepository {
    findAllByMenuId(menuId: number): Promise<Image[]>;
    findDefaultByMenuId(menuId: number): Promise<Image | null>;   
}

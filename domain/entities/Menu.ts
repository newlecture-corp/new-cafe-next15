export class Menu {
    constructor(
        public id: number,
        public korName: string,
        public engName: string,
        public price: number,
        public categoryId: number,
        public createdAt: Date,
        public updatedAt: Date,
        public description?: string // 기본값으로 undefined 설정
    ) {}
}

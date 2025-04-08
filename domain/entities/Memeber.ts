export class Member {
    constructor(
        private username: string,
        private password: string,
        private email: string,        
        private id?: string,
        private image?: string,
        private createdAt?: Date,
        private updatedAt?: Date,
        private deletedAt?: Date
    ) {}
}

import Id from "../value-object/Id";


export default abstract class BaseEntity {
    #id: Id;
    createdAt: Date;
    updatedAt: Date;

    constructor(id?: string, createdAt?: Date, updatedAt?: Date) {
        this.#id = new Id(id);
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }
    get id(): string {
        return this.#id.id
    }
}
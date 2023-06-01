import BaseEntity from "../../../@shared/domain/entity/BaseEntity";

export type ProductProps = {
    id?: string;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export default class Product extends BaseEntity {
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;

    constructor(props: ProductProps) {
        super(props.id, props.createdAt, props.updatedAt);
        this.name = props.name;
        this.description = props.description;
        this.purchasePrice = props.purchasePrice;
        this.stock = props.stock;
    }
}
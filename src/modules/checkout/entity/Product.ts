import BaseEntity from "../../@shared/domain/entity/BaseEntity";

interface ProductProps {
  id?: string;
  name: string;
  description: string;
  salesPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class Product extends BaseEntity {
  #name: string;
  #description: string;
  #salesPrice: number;
  constructor(props: ProductProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this.#name = props.name;
    this.#description = props.description;
    this.#salesPrice = props.salesPrice;
  }

  get name(): string {
    return this.#name;
  }

  get description(): string {
    return this.#description;
  }
  get salesPrice(): number {
    return this.#salesPrice;
  }
}

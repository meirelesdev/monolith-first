import BaseEntity from "../../@shared/domain/entity/BaseEntity";

type ProductProps = {
  id?: string;
  name: string;
  description: string;
  salesPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export default class ProductCatalog extends BaseEntity {
  #name: string;
  #description: string;
  #salesPrice: number;
  constructor(props: ProductProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this.#name = props.name;
    this.#description = props.description;
    this.#salesPrice = props.salesPrice;
  }
  get name() {
    return this.#name;
  }
  get description() {
    return this.#description;
  }
  get salesPrice() {
    return this.#salesPrice;
  }
}

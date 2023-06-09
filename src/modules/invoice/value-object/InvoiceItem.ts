import BaseEntity from "../../@shared/domain/entity/BaseEntity";

interface InvoiceItemProps {
  id?: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export default class InvoiceItem extends BaseEntity {
  #productId: string;
  #name: string;
  #price: number;
  #quantity: number;
  constructor(props: InvoiceItemProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this.#productId = props.productId;
    this.#name = props.name;
    this.#price = props.price;
    this.#quantity = props.quantity;
  }

  get productId(): string {
    return this.#productId;
  }
  get name(): string {
    return this.#name;
  }
  get price(): number {
    return this.#price;
  }
  get quantity(): number {
    return this.#quantity;
  }
  getPrice(): number {
    return this.price * this.quantity;
  }
}

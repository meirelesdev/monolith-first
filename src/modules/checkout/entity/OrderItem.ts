import BaseEntity from "../../@shared/domain/entity/BaseEntity";

interface OrderItemProps {
  id?: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class OrderItem extends BaseEntity {
  #name: string;
  #description: string;
  #price: number;
  #quantity: number;
  constructor(props: OrderItemProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this.#name = props.name;
    this.#description = props.description;
    this.#price = props.price;
    this.#quantity = props.quantity;
  }

  get name(): string {
    return this.#name;
  }

  get description(): string {
    return this.#description;
  }

  get price(): number {
    return this.#price;
  }

  get quantity(): number {
    return this.#quantity;
  }

  get total(): number {
    return this.price * this.quantity;
  }
}

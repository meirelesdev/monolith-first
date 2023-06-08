import BaseEntity from "../../@shared/domain/entity/BaseEntity";
import Client from "./Client";
import Product from "./Product";

interface OrderProps {
  id?: string;
  client: Client;
  products: Product[];
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class Order extends BaseEntity {
  #client: Client;
  #products: Product[];
  #status: string;
  constructor(props: OrderProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this.#client = props.client;
    this.#products = props.products;
    this.#status = props.status || "pending";
  }
  get client(): Client {
    return this.#client;
  }

  get products(): Product[] {
    return this.#products;
  }

  get status(): string {
    return this.#status;
  }

  get total(): number {
    return this.#products.reduce((total, product) => total + product.salesPrice, 0);
  }
}

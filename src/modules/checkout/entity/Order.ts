import BaseEntity from "../../@shared/domain/entity/BaseEntity";
import Client from "./Client";
import OrderItem from "./OrderItem";

interface OrderProps {
  id?: string;
  client: Client;
  items: OrderItem[];
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class Order extends BaseEntity {
  #client: Client;
  #items: OrderItem[];
  #status: string;
  constructor(props: OrderProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this.#client = props.client;
    this.#items = props.items;
    this.#status = props.status || "pending";
  }
  get client(): Client {
    return this.#client;
  }

  get items(): OrderItem[] {
    return this.#items;
  }

  get status(): string {
    return this.#status;
  }

  get total(): number {
    return this.#items.reduce((total, item) => total + item.total, 0);
  }
}

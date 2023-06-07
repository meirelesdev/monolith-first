interface InvoiceItemProps {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}
export default class InvoiceItem {
  #productId: string;
  #name: string;
  #price: number;
  #quantity: number;
  constructor(props: InvoiceItemProps) {
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

import BaseEntity from "../../@shared/domain/entity/BaseEntity";
import InvoiceItem from "../value-object/InvoiceItem";
import Address, { AddressProps } from "../value-object/Address";

interface InvoiceProps {
  id?: string;
  name: string;
  document: string;
  address: AddressProps;
  createdAt?: Date;
  updatedAt?: Date;
}
export default class Invoice extends BaseEntity {
  #name: any;
  #document: any;
  #address: Address;
  #items: InvoiceItem[];
  constructor(props: InvoiceProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this.#name = props.name;
    this.#document = props.document;
    this.validate();
    this.#address = new Address(props.address);
    this.#items = [];
  }

  validate(): void {
    if (!this.#document || !this.#name) throw new Error("Invalid client data");
  }
  addItem(item: InvoiceItem): void {
    this.#items.push(item);
  }

  get address(): string {
    const address = `${this.#address.street}, ${this.#address.number}, ${this.#address.zipcode}, ${
      this.#address.complement
    }, ${this.#address.city}, ${this.#address.state}.`;
    return address;
  }

  get document(): string {
    return this.#document;
  }
  get name(): string {
    return this.#name;
  }

  getTotal(): number {
    return this.#items.reduce((sum, item) => sum + item.getPrice(), 0);
  }

  getItems(): InvoiceItem[] {
    return this.#items;
  }
}

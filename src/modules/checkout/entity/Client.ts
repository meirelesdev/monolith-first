import BaseEntity from "../../@shared/domain/entity/BaseEntity";
import Address, { AddressProps } from "../value-object/Address";

interface ClientProps {
  id?: string;
  name: string;
  email: string;
  document?: string;
  address: AddressProps;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class Client extends BaseEntity {
  #name: string;
  #email: string;
  #address: Address;
  #document?: string;
  constructor(props: ClientProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this.#name = props.name;
    this.#email = props.email;
    this.#document = props.document;
    this.#address = new Address(props.address);
  }

  get name(): string {
    return this.#name;
  }

  get email(): string {
    return this.#email;
  }
  get address(): Address {
    return this.#address;
  }

  get document(): string | undefined {
    return this.#document;
  }
}

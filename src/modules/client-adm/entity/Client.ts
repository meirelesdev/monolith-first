import BaseEntity from "../../@shared/domain/entity/BaseEntity";
import Address, { AddressProps } from "../value-object/Address";

type ClientProps = {
  id?: string;
  name: string;
  email: string;
  document?: string;
  address?: AddressProps;
  createdAt?: Date;
  updatedAt?: Date;
};
export default class Client extends BaseEntity {
  #name: string;
  #email: string;
  #document?: string;
  #address?: Address;
  constructor(clientProps: ClientProps) {
    super(clientProps.id, clientProps.createdAt, clientProps.updatedAt);
    this.#name = clientProps.name;
    this.#email = clientProps.email;
    this.#document = clientProps.document;
    this.#address = clientProps.address ? new Address(clientProps.address) : null;
  }
  get name(): string {
    return this.#name;
  }
  get email(): string {
    return this.#email;
  }
  get document(): string | null {
    return this.#document;
  }
  get address(): Address | null {
    return this.#address;
  }
}

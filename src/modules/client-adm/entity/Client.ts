import BaseEntity from "../../@shared/domain/entity/BaseEntity";
import Address, { AddressProps } from "../value-object/Address";

type ClientProps = {
  id?: string;
  name: string;
  email: string;
  document: string;
  address: AddressProps;
  createdAt?: Date;
  updatedAt?: Date;
};
export default class Client extends BaseEntity {
  #name: string;
  #email: string;
  #address: Address;
  #document: string;
  constructor(clientProps: ClientProps) {
    super(clientProps.id, clientProps.createdAt, clientProps.updatedAt);
    this.#name = clientProps.name;
    this.#email = clientProps.email;
    this.#document = clientProps.document;
    this.#address = new Address(clientProps.address);
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
  get document(): string {
    return this.#document;
  }
}

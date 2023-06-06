import BaseEntity from "../../@shared/domain/entity/BaseEntity";

type ClientProps = {
  id?: string;
  name: string;
  email: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
};
export default class Client extends BaseEntity {
  #name: string;
  #email: string;
  #address: string;
  constructor(clientProps: ClientProps) {
    super(clientProps.id, clientProps.createdAt, clientProps.updatedAt);
    this.#name = clientProps.name;
    this.#email = clientProps.email;
    this.#address = clientProps.address;
  }
  get name() {
    return this.#name;
  }
  get email() {
    return this.#email;
  }
  get address() {
    return this.#address;
  }
}

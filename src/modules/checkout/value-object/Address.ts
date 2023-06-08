export interface AddressProps {
  street: string;
  number: string;
  complement?: string;
  city: string;
  state: string;
  zipcode: string;
}
export default class Address {
  #street: string;
  #number: string;
  #complement?: string;
  #city: string;
  #state: string;
  #zipcode: string;
  constructor(props: AddressProps) {
    this.#street = props.street;
    this.#number = props.number;
    this.#complement = props.complement;
    this.#city = props.city;
    this.#state = props.state;
    this.#zipcode = props.zipcode;
    this.validate();
  }

  get street(): string {
    return this.#street;
  }

  get number(): string {
    return this.#number;
  }
  get complement(): string | undefined {
    return this.#complement;
  }
  get city(): string {
    return this.#city;
  }

  get state(): string {
    return this.#state;
  }

  get zipcode(): string {
    return this.#zipcode;
  }

  validate(): void {
    const invalidAddress =
      !this.street || !this.number || !this.city || !this.state || !this.zipcode;
    if (invalidAddress) throw new Error("Invalid Address");
  }
}

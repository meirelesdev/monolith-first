import { v4 as uuidv4 } from "uuid";

export default class Id {
  #id: string;
  constructor(id?: string) {
    this.#id = id || uuidv4();
  }
  get id(): string {
    return this.#id;
  }
}

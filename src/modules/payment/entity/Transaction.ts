import BaseEntity from "../../@shared/domain/entity/BaseEntity";

interface TransactionProps {
  id?: string;
  amount: number;
  orderId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class Transaction extends BaseEntity {
  #amount: number;
  #orderId: string;
  #status: string;

  constructor(props: TransactionProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this.#amount = props.amount;
    this.#orderId = props.orderId;
    this.#status = "pending";
    this.validate();
  }
  get amount(): number {
    return this.#amount;
  }

  get orderId(): string {
    return this.#orderId;
  }

  get status(): string {
    return this.#status;
  }
  validate(): void {
    if (this.#amount <= 0) {
      throw new Error("Amount must be greater then 0");
    }
  }

  approve(): void {
    this.#status = "approved";
  }

  decline(): void {
    this.#status = "declined";
  }

  process(): void {
    if (this.#amount >= 100) {
      this.approve();
    } else {
      this.decline();
    }
  }
}

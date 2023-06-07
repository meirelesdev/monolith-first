import Transaction from "../../../../modules/payment/entity/Transaction";
import TransactionRepository from "../../../../modules/payment/repository/TransactionRepository";

export default class TransactionRepositoryMemory implements TransactionRepository {
  transactions: Transaction[];
  constructor() {
    this.transactions = [];
  }
  async save(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction);
  }
}

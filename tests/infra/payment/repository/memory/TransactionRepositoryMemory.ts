import Transaction from "../../../../../src/modules/payment/entity/Transaction";
import TransactionRepository from "../../../../../src/modules/payment/repository/TransactionRepository";

export default class TransactionRepositoryMemory implements TransactionRepository {
  transactions: Transaction[];
  constructor() {
    this.transactions = [];
  }
  async save(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction);
  }
}

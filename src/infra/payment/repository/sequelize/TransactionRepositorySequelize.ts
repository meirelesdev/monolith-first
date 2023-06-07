import Transaction from "../../../../modules/payment/entity/Transaction";
import TransactionRepository from "../../../../modules/payment/repository/TransactionRepository";
import TransactionModel from "./TransactionModel";

export default class TransactionRepositorySequelize implements TransactionRepository {
  transactionModel: typeof TransactionModel;
  constructor() {
    this.transactionModel = TransactionModel;
  }
  async save(transaction: Transaction): Promise<void> {
    await this.transactionModel.create({
      id: transaction.id,
      orderId: transaction.orderId,
      amount: transaction.amount,
      status: transaction.status,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    });
  }
}

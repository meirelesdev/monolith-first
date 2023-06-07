import Transaction from "../entity/Transaction";

export default interface TransactionRepository {
  save(transaction: Transaction): Promise<void>;
}

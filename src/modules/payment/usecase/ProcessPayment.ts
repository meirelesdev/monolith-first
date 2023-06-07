import UsecaseInterface from "../../@shared/domain/usecase/UsecaseInterface";
import Transaction from "../entity/Transaction";
import TransactionRepository from "../repository/TransactionRepository";
import { ProcessPaymentInputDTO, ProcessPaymentOutputDTO } from "./ProcessPaymentDTO";

export default class ProcessPayment
  implements UsecaseInterface<ProcessPaymentInputDTO, ProcessPaymentOutputDTO>
{
  #transactionRepository: TransactionRepository;
  constructor(transactionRepository: TransactionRepository) {
    this.#transactionRepository = transactionRepository;
  }
  async execute(input: ProcessPaymentInputDTO): Promise<ProcessPaymentOutputDTO> {
    const transaction = new Transaction({
      amount: input.amount,
      orderId: input.orderId,
    });
    transaction.process();
    await this.#transactionRepository.save(transaction);
    return {
      transactionId: transaction.id,
      orderId: transaction.orderId,
      amount: transaction.amount,
      status: transaction.status,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    };
  }
}

import PaymentFacadeInterface from "../../../modules/payment/facade/PaymentFacadeInterface";
import ProcessPayment from "../../../modules/payment/usecase/ProcessPayment";
import TransactionRepositorySequelize from "../repository/sequelize/TransactionRepositorySequelize";
import PaymentFacade from "./PaymentFacade";

export default class PaymentFacadeFactory {
  static create(): PaymentFacadeInterface {
    const transactionRepository = new TransactionRepositorySequelize();
    const processPayment = new ProcessPayment(transactionRepository);
    return new PaymentFacade(processPayment);
  }
}

import UsecaseInterface from "../../@shared/domain/usecase/UsecaseInterface";

export interface PaymentFacadeInputDTO {
  orderId: string;
  amount: number;
}

export interface PaymentFacadeOutputDTO {
  transactionId: string;
  orderId: string;
  amount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UsecasesProcessPaymentFacadeProps {
  processPayment: UsecaseInterface<PaymentFacadeInputDTO, PaymentFacadeOutputDTO>;
}

export default interface PaymentFacadeInterface {
  process(input: PaymentFacadeInputDTO): Promise<PaymentFacadeOutputDTO>;
}

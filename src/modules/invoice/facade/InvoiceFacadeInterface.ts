import UsecaseInterface from "../../@shared/domain/usecase/UsecaseInterface";

export interface InvoiceFacadeInputDTO {
  name: string;
  document: string;
  street: string;
  complement?: string;
  number: string;
  city: string;
  state: string;
  zipcode: string;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
}

export interface InvoiceFacadeOutputDTO {
  transactionId: string;
  orderId: string;
  amount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UsecasesInvoiceFacadeProps {
  processPayment: UsecaseInterface<InvoiceFacadeInputDTO, InvoiceFacadeOutputDTO>;
}

export default interface InvoiceFacadeInterface {
  create(input: InvoiceFacadeInputDTO): Promise<InvoiceFacadeOutputDTO>;
}

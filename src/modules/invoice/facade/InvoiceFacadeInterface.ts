import UsecaseInterface from "../../@shared/domain/usecase/UsecaseInterface";

export interface InvoiceFacadeInputDTO {
  name: string;
  document: string;
  street: string;
  number: string;
  complement?: string;
  city: string;
  state: string;
  zipCode: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
}

export interface InvoiceFacadeOutputDTO {
  transactionId: string;
  name: string;
  document: string;
  street: string;
  number: string;
  complement?: string;
  city: string;
  state: string;
  zipCode: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
}

export interface UsecasesInvoiceFacadeProps {
  processPayment: UsecaseInterface<InvoiceFacadeInputDTO, InvoiceFacadeOutputDTO>;
}

export default interface InvoiceFacadeInterface {
  create(input: InvoiceFacadeInputDTO): Promise<InvoiceFacadeOutputDTO>;
}

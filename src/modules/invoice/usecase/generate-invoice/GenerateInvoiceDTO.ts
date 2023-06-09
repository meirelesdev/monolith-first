export interface InvoiceInputDTO {
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
export interface InvoiceOutputDTO {
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

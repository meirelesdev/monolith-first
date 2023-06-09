import { AddressProps } from "../../value-object/Address";

export interface PlaceOrderInputDTO {
  clientId: string;
  deliveryAddress: AddressProps;
  products: {
    productId: string;
    quantity: number;
  }[];
}

export interface PlaceOrderOutputDTO {
  id: string;
  invoiceId: string;
  status: string;
  total: number;
  deliveryAddress: AddressProps;
  products: {
    productId: string;
    quantity: number;
  }[];
}

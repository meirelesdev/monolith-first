export default interface GetProductInputDTO {
  productId: string;
}

export interface GetProductOutputDTO {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
}
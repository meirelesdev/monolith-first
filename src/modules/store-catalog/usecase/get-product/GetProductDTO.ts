export interface GetProductOutputDTO {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
}
export default interface GetProductInputDTO {
  productId: string;
}

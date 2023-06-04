export interface FindALlProductsDTO {
  products: {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  }[];
}

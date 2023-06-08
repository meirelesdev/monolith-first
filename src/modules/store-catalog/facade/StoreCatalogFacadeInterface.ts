import UsecaseInterface from "../../@shared/domain/usecase/UsecaseInterface";

export interface UsecasesStoreCatalogFacadeProps {
  findAllProducts: UsecaseInterface<void, FindAllProductsOutputDTO>;
  getProduct: UsecaseInterface<GetProductInputDTO, GetProductOutputDTO>;
}

export interface FindAllProductsOutputDTO {
  products: {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  }[];
}

export interface GetProductInputDTO {
  productId: string;
}

export interface GetProductOutputDTO {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export default interface StoreCatalogFacadeInterface {
  findAllProducts(): Promise<FindAllProductsOutputDTO>;
  getProduct(input: GetProductInputDTO): Promise<GetProductOutputDTO>;
}

import UseCaseInterface from "../../@shared/domain/usecase/UsecaseInterface";
import { AddProductOutputDTO } from "../usecase/add-product/AddProductDTO";

export interface UsecasesProps {
  addUseCase: UseCaseInterface<AddProductFacadeInputDTO, AddProductOutputDTO>;
  stockUseCase: UseCaseInterface<CheckStockFacadeInputDTO, CheckStockFacadeOutputDTO>;
}

export interface AddProductFacadeInputDTO {
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
}

export interface CheckStockFacadeInputDTO {
  productId: string;
}

export interface CheckStockFacadeOutputDTO {
  productId: string;
  stock: number;
}

export default interface ProductAdmFacadeInterface {
  addProduct(input: AddProductFacadeInputDTO): Promise<AddProductOutputDTO>;
  checkStock(input: CheckStockFacadeInputDTO): Promise<CheckStockFacadeOutputDTO>;
}

import Product from "../domain/entity/ProductEntity";
import UseCaseInterface from "../usecase/UseCaseInterface";


export interface UsecasesProps {
	addUseCase: UseCaseInterface;
	stockUseCase: UseCaseInterface;
}

export interface AddProductFacadeInputDTO {
	id?: string;
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
	addProduct(input: AddProductFacadeInputDTO): Promise<Product>;
	checkStock(input: CheckStockFacadeInputDTO): Promise<CheckStockFacadeOutputDTO>;
}
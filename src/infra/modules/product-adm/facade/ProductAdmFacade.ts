import productEntity from "../../../../modules/product-adm/domain/entity/ProductEntity";
import UseCaseInterface from "../../../../modules/product-adm/usecase/UseCaseInterface";
import ProductAdmFacadeInterface, { AddProductFacadeInputDTO, CheckStockFacadeInputDTO, CheckStockFacadeOutputDTO, UsecasesProps } from "../../../../modules/product-adm/facade/ProductAdmFacadeInterface";

export default class ProductFacade implements ProductAdmFacadeInterface {
  #addUsecase: UseCaseInterface;
  #checkStockUsecase: UseCaseInterface;
  constructor(usecasesProps: UsecasesProps) {
    this.#addUsecase = usecasesProps.addUseCase;
    this.#checkStockUsecase = usecasesProps.stockUseCase;
  }

  addProduct(input: AddProductFacadeInputDTO): Promise<productEntity> {
    return this.#addUsecase.execute(input);
  }

  checkStock(input: CheckStockFacadeInputDTO): Promise<CheckStockFacadeOutputDTO> {
    return this.#checkStockUsecase.execute(input);
  }

}
import UseCaseInterface from "../../../../modules/@shared/domain/usecase/UseCaseInterface";
import ProductAdmFacadeInterface, {
  AddProductFacadeInputDTO,
  CheckStockFacadeInputDTO,
  CheckStockFacadeOutputDTO,
  UsecasesProps,
} from "../../../../modules/product-adm/facade/ProductAdmFacadeInterface";
import Product from "../../../../modules/product-adm/entity/ProductEntity";
import {
  AddProductInputDTO,
  AddProductOutputDTO,
} from "../../../../modules/product-adm/usecase/add-product/AddProductDTO";

export default class ProductFacade implements ProductAdmFacadeInterface {
  #addUsecase: UseCaseInterface<AddProductInputDTO, AddProductOutputDTO>;
  #checkStockUsecase: UseCaseInterface<CheckStockFacadeInputDTO, CheckStockFacadeOutputDTO>;
  constructor(usecasesProps: UsecasesProps) {
    this.#addUsecase = usecasesProps.addUseCase;
    this.#checkStockUsecase = usecasesProps.stockUseCase;
  }

  async addProduct(input: AddProductFacadeInputDTO): Promise<AddProductOutputDTO> {
    return this.#addUsecase.execute(input);
  }

  async checkStock(input: CheckStockFacadeInputDTO): Promise<CheckStockFacadeOutputDTO> {
    return this.#checkStockUsecase.execute(input);
  }
}

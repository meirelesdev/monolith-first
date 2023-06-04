import UseCaseInterface from "../../../../modules/product-adm/usecase/UseCaseInterface";
import ProductAdmFacadeInterface, {
  AddProductFacadeInputDTO,
  CheckStockFacadeInputDTO,
  CheckStockFacadeOutputDTO,
  UsecasesProps,
} from "../../../../modules/product-adm/facade/ProductAdmFacadeInterface";
import Product from "../../../../modules/product-adm/entity/ProductEntity";

export default class ProductFacade implements ProductAdmFacadeInterface {
  #addUsecase: UseCaseInterface;
  #checkStockUsecase: UseCaseInterface;
  constructor(usecasesProps: UsecasesProps) {
    this.#addUsecase = usecasesProps.addUseCase;
    this.#checkStockUsecase = usecasesProps.stockUseCase;
  }

  addProduct(input: AddProductFacadeInputDTO): Promise<Product> {
    return this.#addUsecase.execute(input);
  }

  checkStock(input: CheckStockFacadeInputDTO): Promise<CheckStockFacadeOutputDTO> {
    return this.#checkStockUsecase.execute(input);
  }
}

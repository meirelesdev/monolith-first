import UsecaseInterface from "../../../modules/@shared/domain/usecase/UsecaseInterface";
import ProductAdmFacadeInterface, {
  AddProductFacadeInputDTO,
  CheckStockFacadeInputDTO,
  CheckStockFacadeOutputDTO,
  UsecasesProductFacadeProps,
} from "../../../modules/product-adm/facade/ProductAdmFacadeInterface";
import {
  AddProductInputDTO,
  AddProductOutputDTO,
} from "../../../modules/product-adm/usecase/add-product/AddProductDTO";

export default class ProductFacade implements ProductAdmFacadeInterface {
  #addUsecase: UsecaseInterface<AddProductInputDTO, AddProductOutputDTO>;
  #checkStockUsecase: UsecaseInterface<CheckStockFacadeInputDTO, CheckStockFacadeOutputDTO>;
  constructor(usecasesProps: UsecasesProductFacadeProps) {
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

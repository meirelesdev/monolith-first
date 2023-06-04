import UsecaseInterface from "../../../modules/@shared/domain/usecase/UsecaseInterface";
import StoreCatalogFacadeInterface, {
  FindAllProductsOutputDTO,
  GetProductInputDTO,
  GetProductOutputDTO,
  UsecasesStoreCatalogFacadeProps,
} from "../../../modules/store-catalog/facade/StoreCatalogFacadeInterface";

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  #findAllProducts: UsecaseInterface<void, FindAllProductsOutputDTO>;
  #getProduct: UsecaseInterface<GetProductInputDTO, GetProductOutputDTO>;
  constructor(usecasesProps: UsecasesStoreCatalogFacadeProps) {
    this.#findAllProducts = usecasesProps.findAllProducts;
    this.#getProduct = usecasesProps.getProduct;
  }
  async findAllProducts(): Promise<FindAllProductsOutputDTO> {
    return this.#findAllProducts.execute();
  }
  async getProduct(input: GetProductInputDTO): Promise<GetProductOutputDTO> {
    return this.#getProduct.execute(input);
  }
}

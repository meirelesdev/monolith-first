import UseCaseInterface from "../../../@shared/domain/usecase/UseCaseInterface";
import {
  CheckStockFacadeInputDTO,
  CheckStockFacadeOutputDTO,
} from "../../facade/ProductAdmFacadeInterface";
import ProductRepository from "../../repository/ProductRepository";

export default class CheckStockUsecase implements UseCaseInterface<any, any> {
  #productRepository: ProductRepository;
  constructor(productRepository: ProductRepository) {
    this.#productRepository = productRepository;
  }
  async execute(input: CheckStockFacadeInputDTO): Promise<CheckStockFacadeOutputDTO> {
    const product = await this.#productRepository.find(input.productId);
    if (!product) throw new Error("Product not found");
    return {
      productId: product.id,
      stock: product.stock,
    };
  }
}

import UseCaseInterface from "../../../@shared/domain/usecase/UsecaseInterface";
import ProductRepository from "../../repository/ProductRepository";
import { CheckStockInputDTO, CheckStockOutputDTO } from "./checkStockDTO";

export default class CheckStockUsecase implements UseCaseInterface<any, any> {
  #productRepository: ProductRepository;
  constructor(productRepository: ProductRepository) {
    this.#productRepository = productRepository;
  }
  async execute(input: CheckStockInputDTO): Promise<CheckStockOutputDTO> {
    const product = await this.#productRepository.find(input.productId);
    if (!product) throw new Error("Product not found");
    return {
      productId: product.id,
      stock: product.stock,
    };
  }
}

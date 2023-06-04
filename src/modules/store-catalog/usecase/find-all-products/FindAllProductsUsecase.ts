import UsecaseInterface from "../../../@shared/domain/usecase/UsecaseInterface";
import ProductRepository from "../../repository/ProductRepository";
import { FindAllProductsDTO } from "./FindAllProductsDTO";

export default class FindAllProductsUsecase implements UsecaseInterface<void, FindAllProductsDTO> {
  #productRepository: ProductRepository;
  constructor(productRepository: ProductRepository) {
    this.#productRepository = productRepository;
  }
  async execute(): Promise<FindAllProductsDTO> {
    const products = await this.#productRepository.findAll();
    const result = products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    }));
    return {
      products: result,
    };
  }
}

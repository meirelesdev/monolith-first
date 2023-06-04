import ProductRepository from "../../repository/ProductRepository";
import { FindALlProductsDTO } from "./FindAllProductsDTO";

export default class FindAllProductsUsecase {
  #productRepository: ProductRepository;
  constructor(productRepository: ProductRepository) {
    this.#productRepository = productRepository;
  }
  async execute(): Promise<FindALlProductsDTO> {
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

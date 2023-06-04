import UsecaseInterface from "../../../@shared/domain/usecase/UsecaseInterface";
import ProductRepository from "../../repository/ProductRepository";
import GetProductInputDTO, { GetProductOutputDTO } from "./GetProductDTO";

export default class GetProductUsecase
  implements UsecaseInterface<GetProductInputDTO, GetProductOutputDTO>
{
  #productRepository: ProductRepository;
  constructor(productrepository: ProductRepository) {
    this.#productRepository = productrepository;
  }
  async execute(input: GetProductInputDTO): Promise<GetProductOutputDTO> {
    const product = await this.#productRepository.find(input.productId);
    if (!product) throw new Error("Product not found");
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    };
  }
}

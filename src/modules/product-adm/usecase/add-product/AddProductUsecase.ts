import ProductAdm from "../../entity/ProductEntity";
import ProductRepository from "../../repository/ProductRepository";
import UseCaseInterface from "../../../@shared/domain/usecase/UsecaseInterface";
import { AddProductInputDTO, AddProductOutputDTO } from "./AddProductDTO";

export default class AddProductUseCase
  implements UseCaseInterface<AddProductInputDTO, AddProductOutputDTO>
{
  #productRepository: ProductRepository;
  constructor(productRepository: ProductRepository) {
    this.#productRepository = productRepository;
  }

  async execute(input: AddProductInputDTO): Promise<AddProductOutputDTO> {
    const props = {
      id: input.id,
      name: input.name,
      description: input.description,
      purchasePrice: input.purchasePrice,
      stock: input.stock,
    };
    const product = new ProductAdm(props);
    this.#productRepository.add(product);
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}

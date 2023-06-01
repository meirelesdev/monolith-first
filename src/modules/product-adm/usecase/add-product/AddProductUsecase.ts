/** @format */

import Product, { ProductProps } from "../../domain/entity/ProductEntity";
import ProductGateway from "../../domain/repository/ProductRepository";
import { AddProductInputDTO, AddProductOutputDTO } from "./AddProductDTO";

export default class AddProductUseCase {
    #productRepository: ProductGateway;
    constructor(productRepository: ProductGateway) {
        this.#productRepository = productRepository;
    }

    async execute(input: AddProductInputDTO): Promise<AddProductOutputDTO> {
        const props: ProductProps = {
            id: input.id,
            name: input.name,
            description: input.description,
            purchasePrice: input.purchasePrice,
            stock: input.stock,
        };
        const product = new Product(props);
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

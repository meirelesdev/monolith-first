import Product from "../../../../../modules/product-adm/domain/entity/ProductEntity";
import ProductRepository from "../../../../../modules/product-adm/domain/repository/ProductRepository";
import ProductModel from "./ProductModel";

export default class ProductRepositorySequelize implements ProductRepository {

	async add(product: Product): Promise<Product> {
		const productModel = await ProductModel.create({
			id: product.id,
			name: product.name,
			description: product.description,
			purchasePrice: product.purchasePrice,
			stock: product.stock,
			createdAt: product.createdAt,
			updatedAt: product.updatedAt,
		});
		return new Product(productModel)
	}

	async find(id: string): Promise<Product> {
		const product = await ProductModel.findOne({
			where: {
				id,
			},
		})

		return new Product(product)
	}
}
import Product from "../../../../../modules/product-adm/entity/ProductEntity";
import ProductRepository from "../../../../../modules/product-adm/repository/ProductRepository";
import ProductModel from "./ProductModel";

export default class ProductRepositorySequelize implements ProductRepository {
  productModel: typeof ProductModel;
  constructor() {
    this.productModel = ProductModel;
  }

  async add(product: Product): Promise<Product> {
    const productModel = await this.productModel.create({
      id: product.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
    return new Product(productModel);
  }

  async find(id: string): Promise<Product> {
    const product = await this.productModel.findOne({
      where: {
        id,
      },
    });

    return new Product(product);
  }
}

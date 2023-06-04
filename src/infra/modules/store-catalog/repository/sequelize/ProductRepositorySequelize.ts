import Product from "../../../../../modules/store-catalog/entity/Product";
import ProductRepository from "../../../../../modules/store-catalog/repository/ProductRepository";
import ProductModel from "./ProductModel";

export default class ProductRepositorySequelize implements ProductRepository {
  productModel: typeof ProductModel;
  constructor() {
    this.productModel = ProductModel;
  }
  findAll(): Promise<Product[]> {
    throw new Error("Method not implemented.");
  }
  async find(id: string): Promise<Product> {
    const product = await this.productModel.findOne({
      where: {
        id,
      },
    });
    const productProps = {
      id: product.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
    return new Product(productProps);
  }
}

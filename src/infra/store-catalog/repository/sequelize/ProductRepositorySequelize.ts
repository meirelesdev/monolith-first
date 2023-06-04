import Product from "../../../../modules/store-catalog/entity/Product";
import ProductRepository from "../../../../modules/store-catalog/repository/ProductRepository";
import ProductModel from "./ProductModel";

export default class ProductRepositorySequelize implements ProductRepository {
  productModel: typeof ProductModel;
  constructor() {
    this.productModel = ProductModel;
  }
  async findAll(): Promise<Product[]> {
    const productsData = await this.productModel.findAll();
    return productsData.map(
      (data) =>
        new Product({
          id: data.id,
          name: data.name,
          description: data.description,
          salesPrice: data.salesPrice,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        })
    );
  }
  async find(id: string): Promise<Product> {
    const productData = await this.productModel.findOne({
      where: {
        id,
      },
    });
    if (!productData) throw new Error("Product not found");
    return new Product({
      id: productData.id,
      name: productData.name,
      description: productData.description,
      salesPrice: productData.salesPrice,
      createdAt: productData.createdAt,
      updatedAt: productData.updatedAt,
    });
  }
}

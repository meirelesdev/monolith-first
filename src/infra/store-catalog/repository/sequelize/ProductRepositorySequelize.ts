import ProductCatalog from "../../../../modules/store-catalog/entity/ProductCatalog";
import ProductRepository from "../../../../modules/store-catalog/repository/ProductRepository";
import ProductModel from "./ProductModel";

export default class ProductRepositorySequelize implements ProductRepository {
  productModel: typeof ProductModel;
  constructor() {
    this.productModel = ProductModel;
  }
  async findAll(): Promise<ProductCatalog[]> {
    const productsData = await this.productModel.findAll();
    return productsData.map(
      (data) =>
        new ProductCatalog({
          id: data.id,
          name: data.name,
          description: data.description,
          salesPrice: data.price,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        })
    );
  }
  async find(id: string): Promise<ProductCatalog> {
    const productData = await this.productModel.findOne({
      where: {
        id,
      },
    });
    if (!productData) throw new Error("Product not found");
    return new ProductCatalog({
      id: productData.id,
      name: productData.name,
      description: productData.description,
      salesPrice: productData.price,
      createdAt: productData.createdAt,
      updatedAt: productData.updatedAt,
    });
  }
}

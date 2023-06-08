import ProductAdm from "../../../../modules/product-adm/entity/ProductEntity";
import ProductRepository from "../../../../modules/product-adm/repository/ProductRepository";
import ProductModel from "./ProductModel";

export default class ProductRepositorySequelize implements ProductRepository {
  productModel: typeof ProductModel;
  constructor() {
    this.productModel = ProductModel;
  }

  async add(product: ProductAdm): Promise<ProductAdm> {
    const productModel = await this.productModel.create({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
    return new ProductAdm({
      id: productModel.id,
      name: productModel.name,
      description: productModel.description,
      purchasePrice: productModel.price,
      stock: productModel.stock,
      createdAt: productModel.createdAt,
      updatedAt: productModel.updatedAt,
    });
  }

  async find(id: string): Promise<ProductAdm> {
    const productModel = await this.productModel.findOne({
      where: {
        id,
      },
    });
    if (!productModel) throw new Error(`Product not found`);
    return new ProductAdm({
      id: productModel.id,
      name: productModel.name,
      description: productModel.description,
      purchasePrice: productModel.price,
      stock: productModel.stock,
      createdAt: productModel.createdAt,
      updatedAt: productModel.updatedAt,
    });
  }
}

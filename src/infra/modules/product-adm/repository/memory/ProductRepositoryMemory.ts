import ProductEntity from "../../../../../modules/product-adm/domain/entity/ProductEntity";
import ProductRepository from "../../../../../modules/product-adm/domain/repository/ProductRepository";

export default class ProductRepositoryMemory implements ProductRepository {
  products: ProductEntity[];
  constructor() {
    this.products = []
  }
  async add(product: ProductEntity): Promise<ProductEntity> {
    this.products.push(product)
    return product;
  }
  async find(id: string): Promise<ProductEntity> {
    const product = this.products.find(product => product.id === id);
    if (!product) throw new Error(`Product not found`);
    return product;
  }
}
import Product from "../../../../../modules/product-adm/entity/ProductEntity";
import ProductRepository from "../../../../../modules/product-adm/repository/ProductRepository";

export default class ProductRepositoryMemory implements ProductRepository {
  products: Product[];
  constructor() {
    this.products = [];
  }
  async add(product: Product): Promise<Product> {
    this.products.push(product);
    return product;
  }
  async find(id: string): Promise<Product> {
    const product = this.products.find((product) => product.id === id);
    if (!product) throw new Error(`Product not found`);
    return product;
  }
}

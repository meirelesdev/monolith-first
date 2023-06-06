import ProductCatalog from "../../../../modules/store-catalog/entity/ProductCatalog";
import ProductRepository from "../../../../modules/store-catalog/repository/ProductRepository";

export default class ProductRepositoryMemory implements ProductRepository {
  products: ProductCatalog[];
  constructor() {
    const productProps = {
      id: "1",
      name: "test",
      description: "test",
      salesPrice: 10,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const product1 = new ProductCatalog(productProps);
    const productProps2 = {
      id: "2",
      name: "test",
      description: "test",
      salesPrice: 10,
      stock: 20,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const product2 = new ProductCatalog(productProps2);
    this.products = [product1, product2];
  }
  async findAll(): Promise<ProductCatalog[]> {
    return this.products;
  }
  async find(id: string): Promise<ProductCatalog> {
    return this.products.find((product) => product.id === id);
  }
}

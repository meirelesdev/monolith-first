import Product from "../entity/ProductCatalog";

export default interface ProductRepository {
  findAll(): Promise<Product[]>;
  find(id: string): Promise<Product>;
}

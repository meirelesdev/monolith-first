import Product from "../entity/Product";

export default interface ProductRepository {
  findAll(): Promise<Product[]>;
  find(id: string): Promise<Product>;
}

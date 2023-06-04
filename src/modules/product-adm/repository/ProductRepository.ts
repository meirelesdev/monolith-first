import Product from "../entity/ProductEntity";

export default interface ProductRepository {
  add(product: Product): Promise<Product>;
  find(id: string): Promise<Product>;
}

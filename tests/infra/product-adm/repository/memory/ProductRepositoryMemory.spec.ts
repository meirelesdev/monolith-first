import ProductRepositoryMemory from "../../../../../../src/infra/product-adm/repository/memory/ProductRepositoryMemory";
import Product from "../../../../../../src/modules/product-adm/entity/ProductEntity";

describe("ProductRepository test", () => {
  it("should return product", async () => {
    const productProps = {
      name: "test",
      description: "test",
      purchasePrice: 10,
      stock: 10,
    };
    const product = new Product(productProps);
    const productRepository = new ProductRepositoryMemory();
    const result = await productRepository.add(product);
    expect(result.name).toBe("test");
    expect(result.description).toBe("test");
    expect(result.purchasePrice).toBe(10);
    expect(result.stock).toBe(10);
  });

  it("should find a product", async () => {
    const productProps = {
      name: "test",
      description: "test",
      purchasePrice: 10,
      stock: 10,
    };
    const product = new Product(productProps);
    const productRepository = new ProductRepositoryMemory();
    const savedProduct = await productRepository.add(product);

    const productDb = await productRepository.find(savedProduct.id);
    expect(productDb.id).toBe(savedProduct.id);
  });
});

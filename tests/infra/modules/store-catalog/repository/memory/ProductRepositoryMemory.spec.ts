import ProductRepositoryMemory from "../../../../../../src/infra/modules/store-catalog/repository/memory/ProductRepositoryMemory";

describe("ProductRepository test", () => {
  it("should find a product", async () => {
    const productRepository = new ProductRepositoryMemory();
    const productDb = await productRepository.find("1");
    expect(productDb.id).toBe("1");
  });
  it("should findAll products", async () => {
    const productRepository = new ProductRepositoryMemory();
    const products = await productRepository.findAll();
    expect(products).toHaveLength(2);
  });
});

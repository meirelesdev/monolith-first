import ProductAdm from "../../../../src/modules/product-adm/entity/ProductEntity";

describe("ProductEntity tests", () => {
  it("should create a new ProductEntity", () => {
    const productProps = {
      name: "test",
      description: "test",
      purchasePrice: 10,
      stock: 10,
    };
    const product = new ProductAdm(productProps);
    expect(product.id).toBeDefined();
    expect(product.createdAt).toBeDefined();
    expect(product.updatedAt).toBeDefined();
  });
});

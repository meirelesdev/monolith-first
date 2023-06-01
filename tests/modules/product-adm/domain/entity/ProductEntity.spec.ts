import Product from "../../../../../src/modules/product-adm/domain/entity/ProductEntity";

describe("ProductEntity tests", () => {
  it("should create a new ProductEntity", () => {
    const productProps = {
      name: "test",
      description: "test",
      purchasePrice: 10,
      stock: 10,
    }
    const product = new Product(productProps);
    expect(product.id).toBeDefined()
    expect(product.createdAt).toBeDefined()
    expect(product.updatedAt).toBeDefined()
  })
})
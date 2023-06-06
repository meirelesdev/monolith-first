import ProductCatalog from "../../../../src/modules/store-catalog/entity/ProductCatalog";

describe("ProductCatalog tests", () => {
  it("should create a product catalog", () => {
    const productCatalogProps = {
      name: "Product 1",
      description: "Description 1",
      salesPrice: 100,
    };
    const productCatalog = new ProductCatalog(productCatalogProps);
    expect(productCatalog.id).toBeDefined();
    expect(productCatalog.name).toBe("Product 1");
    expect(productCatalog.description).toBe("Description 1");
    expect(productCatalog.salesPrice).toBe(100);
    expect(productCatalog.createdAt).toBeDefined();
    expect(productCatalog.updatedAt).toBeDefined();
  });
});

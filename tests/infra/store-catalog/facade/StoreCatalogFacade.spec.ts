import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import StoreCatalogFacadeFactory from "../../../../../src/infra/store-catalog/facade/StoreCatalogFacadeFactory";
import ProductModel from "../../../../../src/infra/store-catalog/repository/sequelize/ProductModel";

describe("ProductAdmFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    const configSequelize: SequelizeOptions = {
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    };
    sequelize = new Sequelize(configSequelize);
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  it("should find all products", async () => {
    const storeCatalogFacade = StoreCatalogFacadeFactory.create();
    const output = await storeCatalogFacade.findAllProducts();
    expect(output.products).toHaveLength(0);
  });

  it("should not be able to get product by id using facade when product not exists.", async () => {
    const storeCatalogFacade = StoreCatalogFacadeFactory.create();
    const input = {
      productId: "1",
    };

    await expect(() => storeCatalogFacade.getProduct(input)).rejects.toThrow(
      new Error("Product not found")
    );
  });

  afterEach(async () => {
    await sequelize.close();
  });
});

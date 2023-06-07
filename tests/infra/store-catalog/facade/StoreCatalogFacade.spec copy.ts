import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import StoreCatalogFacade from "../../../../src/infra/store-catalog/facade/StoreCatalogFacade";

import ProductModel from "../../../../src/infra/store-catalog/repository/sequelize/ProductModel";
import ProductRepositorySequelize from "../../../../src/infra/store-catalog/repository/sequelize/ProductRepositorySequelize";
import FindAllProductsUsecase from "../../../../src/modules/store-catalog/usecase/find-all-products/FindAllProductsUsecase";
import GetProductUsecase from "../../../../src/modules/store-catalog/usecase/get-product/GetProductUsecase";

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
    const productRepository = new ProductRepositorySequelize();
    const findAllProducts = new FindAllProductsUsecase(productRepository);
    const output = await findAllProducts.execute();
    expect(output.products).toHaveLength(0);
  });

  it("should not be able to get product by id using facade when product not exists.", async () => {
    const productRepository = new ProductRepositorySequelize();
    const getProduct = new GetProductUsecase(productRepository);
    await expect(() => getProduct.execute({ productId: "123" })).rejects.toThrow(
      new Error("Product not found")
    );
  });

  afterEach(async () => {
    await sequelize.close();
  });
});

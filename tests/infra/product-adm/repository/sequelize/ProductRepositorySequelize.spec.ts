import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import ProductModel from "../../../../../src/infra/product-adm/repository/sequelize/ProductModel";
import ProductRepositorySequelize from "../../../../../src/infra/product-adm/repository/sequelize/ProductRepositorySequelize";
import ProductAdm from "../../../../../src/modules/product-adm/entity/ProductEntity";

describe("ProductRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    const configConnection: SequelizeOptions = {
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    };
    sequelize = new Sequelize(configConnection);
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should return product", async () => {
    const productProps = {
      id: "1",
      name: "test",
      description: "test",
      purchasePrice: 10,
      stock: 10,
    };
    const product = new ProductAdm(productProps);
    const productRepository = new ProductRepositorySequelize();
    const result = await productRepository.add(product);
    expect(result.name).toBe("test");
    expect(result.description).toBe("test");
    expect(result.purchasePrice).toBe(10);
    expect(result.stock).toBe(10);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
  });

  it("should find a product adm sequelize", async () => {
    const productProps = {
      id: "1",
      name: "test",
      description: "test",
      purchasePrice: 10,
      stock: 10,
    };
    const product = new ProductAdm(productProps);
    const productRepository = new ProductRepositorySequelize();
    await productRepository.add(product);
    const productDb = await productRepository.find(productProps.id);
    expect(productDb.id).toBe(productProps.id);
  });
});

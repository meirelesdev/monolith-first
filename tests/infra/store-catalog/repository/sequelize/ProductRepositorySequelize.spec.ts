import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import ProductModel from "../../../../../src/infra/store-catalog/repository/sequelize/ProductModel";
import ProductRepositorySequelize from "../../../../../src/infra/store-catalog/repository/sequelize/ProductRepositorySequelize";
import ProductCatalog from "../../../../../src/modules/store-catalog/entity/ProductCatalog";

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

  it("should find a product catalog sequelize", async () => {
    const productProps = {
      id: "1",
      name: "test",
      description: "test",
      salesPrice: 10,
    };

    const product = new ProductCatalog(productProps);
    await ProductModel.create({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.salesPrice,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
    const productRepository = new ProductRepositorySequelize();
    const result = await productRepository.find(productProps.id);
    expect(result.name).toBe("test");
    expect(result.description).toBe("test");
    expect(result.salesPrice).toBe(10);
  });

  it("should find all product catalog sequelize", async () => {
    const productProps1 = {
      id: "1",
      name: "test",
      description: "test",
      salesPrice: 10,
    };
    const product1 = new ProductCatalog(productProps1);
    await ProductModel.create({
      id: product1.id,
      name: product1.name,
      description: product1.description,
      price: product1.salesPrice,
      createdAt: product1.createdAt,
      updatedAt: product1.updatedAt,
    });
    const productProps2 = {
      id: "2",
      name: "test",
      description: "test",
      salesPrice: 10,
    };
    const product2 = new ProductCatalog(productProps2);
    await ProductModel.create({
      id: product2.id,
      name: product2.name,
      description: product2.description,
      price: product2.salesPrice,
      createdAt: product2.createdAt,
      updatedAt: product2.updatedAt,
    });
    const productRepository = new ProductRepositorySequelize();
    const products = await productRepository.findAll();

    expect(products).toHaveLength(2);
  });

  afterEach(async () => {
    await sequelize.close();
  });
});

import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import ProductAdmFacadeFactory from "../../../../../src/infra/product-adm/facade/ProductAdmFacadeFactory";
import ProductModel from "../../../../../src/infra/product-adm/repository/sequelize/ProductModel";

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

  it("should create a product ", async () => {
    const productFacade = ProductAdmFacadeFactory.create();
    const input = {
      id: "1",
      name: "Product 1",
      description: "Product01 01 ",
      purchasePrice: 10,
      stock: 10,
    };
    await productFacade.addProduct(input);
    const product = await ProductModel.findOne({
      where: {
        id: input.id,
      },
    });
    expect(product).toBeTruthy();
    expect(product.name).toBe(input.name);
    expect(product.description).toBe(input.description);
    expect(product.purchasePrice).toBe(input.purchasePrice);
    expect(product.stock).toBe(input.stock);
  });

  it("should check stock of product created.", async () => {
    const productFacade = ProductAdmFacadeFactory.create();
    const input = {
      name: "Product 1",
      description: "Product01 01 ",
      purchasePrice: 10,
      stock: 10,
    };
    const addProductOutput = await productFacade.addProduct(input);
    const checkStock = await productFacade.checkStock({ productId: addProductOutput.id });
    expect(checkStock.productId).toBeDefined();
    expect(checkStock.stock).toBe(addProductOutput.stock);
  });

  afterEach(async () => {
    await sequelize.close();
  });
});

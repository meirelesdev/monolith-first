import { Sequelize } from "sequelize-typescript";
import ProductAdmFacadeFactory from "../../../../../src/infra/modules/product-adm/factory/ProductAdmFacadeFactory";
import ProductModel from "../../../../../src/infra/modules/product-adm/repository/sequelize/ProductModel";

describe("ProductAdmFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  it("should crate a product ", async () => {
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

  afterEach(async () => {
    await sequelize.close();
  });
});

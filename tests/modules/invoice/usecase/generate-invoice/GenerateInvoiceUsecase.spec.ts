import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import StoreCatalogFacadeFactory from "../../../../../src/infra/store-catalog/facade/StoreCatalogFacadeFactory";
import ProductModel from "../../../../../src/infra/store-catalog/repository/sequelize/ProductModel";
import GenerateInvoiceUsecase from "../../../../../src/modules/invoice/usecase/generate-invoice/GenerateInvoiceUsecase";
import InvoiceRepositoryMemory from "../../repository/InvoiceRepositoryMemory";

let sequelize: Sequelize;
describe("GenerateInvoiceUsecase tests", () => {
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
  it("Should generate a invoice", async () => {
    await ProductModel.create({
      id: "01",
      name: "Product 01",
      description: "Description of product 01",
      price: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const invoiceRepository = new InvoiceRepositoryMemory();
    const storeCatalogFacade = StoreCatalogFacadeFactory.create();
    const generateInvoiceUsecase = new GenerateInvoiceUsecase(
      storeCatalogFacade,
      invoiceRepository
    );
    const input = {
      name: "Client 01",
      document: "0123456789",
      street: "Street 01",
      number: "01",
      city: "City 01",
      state: "State 01",
      zipCode: "88000-000",
      items: [
        {
          id: "01",
          name: "Product 01",
          price: 10,
          quantity: 2,
        },
      ],
    };
    const invoiceOutput = await generateInvoiceUsecase.execute(input);
    expect(invoiceOutput.transactionId).toBeDefined();
    expect(invoiceOutput.total).toBe(20);
  });
});

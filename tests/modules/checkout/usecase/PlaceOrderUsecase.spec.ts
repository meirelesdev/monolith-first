import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import ClientAdmFacadeFactory from "../../../../src/infra/client-adm/facade/ClientAdmFacadeFactory";
import ClientModel from "../../../../src/infra/client-adm/repository/sequelize/ClientModel";
import ProductAdmFacadeFactory from "../../../../src/infra/product-adm/facade/ProductAdmFacadeFactory";
import ProductModel from "../../../../src/infra/product-adm/repository/sequelize/ProductModel";
import ProductModel2 from "../../../../src/infra/store-catalog/repository/sequelize/ProductModel";
import StoreCatalogFacadeFactory from "../../../../src/infra/store-catalog/facade/StoreCatalogFacadeFactory";
import { PlaceOrderInputDTO } from "../../../../src/modules/checkout/usecase/place-order/PlaceOrderDTO";
import PlaceOrderUsecase from "../../../../src/modules/checkout/usecase/place-order/PlaceOrderUsecase";
import PaymentFacadeFactory from "../../../../src/infra/payment/facade/PaymentFacadeFactory";
import TransactionModel from "../../../../src/infra/payment/repository/sequelize/TransactionModel";
import CheckoutRepositoryMemory from "../../../infra/checkout/repository/CheckoutRepositoryMemory";
import InvoiceFacadeFactory from "../../../../src/infra/invoice/facade/InvoiceFacadeFactory";

describe("PlaceOrderUsecase tests", () => {
  let sequelize: Sequelize;
  beforeEach(async () => {
    const configConnection: SequelizeOptions = {
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    };
    sequelize = new Sequelize(configConnection);
    sequelize.addModels([ProductModel, ClientModel, ProductModel2, TransactionModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should throw an error when client not found", async () => {
    const clientFacade = ClientAdmFacadeFactory.create();
    const productFacade = ProductAdmFacadeFactory.create();
    const catalogFacade = StoreCatalogFacadeFactory.create();
    const paymentFacade = PaymentFacadeFactory.create();
    const checkoutRepository = new CheckoutRepositoryMemory();
    const invoiceFacade = InvoiceFacadeFactory.create();
    const placeOrderUsecase = new PlaceOrderUsecase(
      clientFacade,
      productFacade,
      paymentFacade,
      catalogFacade,
      invoiceFacade,
      checkoutRepository
    );

    const input: PlaceOrderInputDTO = {
      clientId: "0",
      deliveryAddress: {
        city: "San Francisco",
        number: "1",
        state: "State 01",
        street: "Street 01",
        zipcode: "88000-000",
      },
      products: [],
    };
    await expect(() => placeOrderUsecase.execute(input)).rejects.toThrow(
      new Error("Client not found")
    );
  });

  it("should throw an error when products are not valid", async () => {
    const clientFacade = ClientAdmFacadeFactory.create();
    const mockClient = jest.spyOn(clientFacade, "findClient");
    mockClient.mockImplementation(() =>
      Promise.resolve({
        id: "0",
        name: "Client test",
        document: "1234567890",
        email: "email@example.com",
        address: {
          street: "Address 1",
          number: "01",
          city: "city 01",
          state: "State 01",
          zipcode: "88008000",
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );
    const productFacade = ProductAdmFacadeFactory.create();
    const catalogFacade = StoreCatalogFacadeFactory.create();
    const paymentFacade = PaymentFacadeFactory.create();
    const checkoutRepository = new CheckoutRepositoryMemory();
    const invoiceFacade = InvoiceFacadeFactory.create();
    const placeOrderUsecase = new PlaceOrderUsecase(
      clientFacade,
      productFacade,
      paymentFacade,
      catalogFacade,
      invoiceFacade,
      checkoutRepository
    );

    const input: PlaceOrderInputDTO = {
      clientId: "0",
      deliveryAddress: {
        city: "San Francisco",
        number: "1",
        state: "State 01",
        street: "Street 01",
        zipcode: "88000-000",
      },
      products: [],
    };
    await expect(() => placeOrderUsecase.execute(input)).rejects.toThrow(
      new Error("No products selected")
    );
  });

  it("should throw an error when product not found", async () => {
    const clientFacade = ClientAdmFacadeFactory.create();
    const mockClient = jest.spyOn(clientFacade, "findClient");
    mockClient.mockImplementation(() =>
      Promise.resolve({
        id: "0",
        name: "Client test",
        email: "email@example.com",
        document: "1234567890",
        address: {
          street: "Address 1",
          number: "01",
          city: "city 01",
          state: "State 01",
          zipcode: "88008000",
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );
    const productFacade = ProductAdmFacadeFactory.create();
    const catalogFacade = StoreCatalogFacadeFactory.create();
    const paymentFacade = PaymentFacadeFactory.create();
    const checkoutRepository = new CheckoutRepositoryMemory();
    const invoiceFacade = InvoiceFacadeFactory.create();
    const placeOrderUsecase = new PlaceOrderUsecase(
      clientFacade,
      productFacade,
      paymentFacade,
      catalogFacade,
      invoiceFacade,
      checkoutRepository
    );

    let input: PlaceOrderInputDTO = {
      clientId: "0",
      deliveryAddress: {
        city: "San Francisco",
        number: "1",
        state: "State 01",
        street: "Street 01",
        zipcode: "88000-000",
      },
      products: [{ productId: "1", quantity: 2 }],
    };
    await expect(() => placeOrderUsecase.execute(input)).rejects.toThrow(
      new Error("Product not found")
    );
  });

  it("should throw an error when product is out of stock", async () => {
    await ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Product description",
      price: 10,
      stock: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await ProductModel.create({
      id: "2",
      name: "Product 2",
      description: "Product description",
      price: 10,
      stock: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const clientFacade = ClientAdmFacadeFactory.create();
    const mockClient = jest.spyOn(clientFacade, "findClient");
    mockClient.mockImplementation(() =>
      Promise.resolve({
        id: "0",
        name: "Client test",
        document: "1234567890",
        email: "email@example.com",
        address: {
          street: "Address 1",
          number: "01",
          city: "city 01",
          state: "State 01",
          zipcode: "88008000",
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );
    const productFacade = ProductAdmFacadeFactory.create();
    const catalogFacade = StoreCatalogFacadeFactory.create();
    const paymentFacade = PaymentFacadeFactory.create();
    const checkoutRepository = new CheckoutRepositoryMemory();
    const invoiceFacade = InvoiceFacadeFactory.create();
    const placeOrderUsecase = new PlaceOrderUsecase(
      clientFacade,
      productFacade,
      paymentFacade,
      catalogFacade,
      invoiceFacade,
      checkoutRepository
    );

    let input: PlaceOrderInputDTO = {
      clientId: "0",
      deliveryAddress: {
        city: "San Francisco",
        number: "1",
        state: "State 01",
        street: "Street 01",
        zipcode: "88000-000",
      },
      products: [
        { productId: "1", quantity: 2 },
        { productId: "2", quantity: 1 },
      ],
    };
    await expect(() => placeOrderUsecase.execute(input)).rejects.toThrow(
      new Error("Product 1 is not available in stock")
    );

    input = {
      clientId: "0",
      deliveryAddress: {
        city: "San Francisco",
        number: "1",
        state: "State 01",
        street: "Street 01",
        zipcode: "88000-000",
      },
      products: [
        { productId: "1", quantity: 1 },
        { productId: "2", quantity: 2 },
      ],
    };
    await expect(() => placeOrderUsecase.execute(input)).rejects.toThrow(
      new Error("Product 2 is not available in stock")
    );
  });

  it("should not be approved order when value is less then 100", async () => {
    await ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Product description",
      price: 10,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await ProductModel.create({
      id: "2",
      name: "Product 2",
      description: "Product description",
      price: 10,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const clientFacade = ClientAdmFacadeFactory.create();
    const mockClient = jest.spyOn(clientFacade, "findClient");
    mockClient.mockImplementation(() =>
      Promise.resolve({
        id: "1",
        name: "Client test",
        email: "email@example.com",
        document: "1234567890",
        address: {
          street: "Address 1",
          number: "01",
          city: "city 01",
          state: "State 01",
          zipcode: "88008000",
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );
    const productFacade = ProductAdmFacadeFactory.create();
    const catalogFacade = StoreCatalogFacadeFactory.create();
    const paymentFacade = PaymentFacadeFactory.create();
    const checkoutRepository = new CheckoutRepositoryMemory();
    const invoiceFacade = InvoiceFacadeFactory.create();
    const placeOrderUsecase = new PlaceOrderUsecase(
      clientFacade,
      productFacade,
      paymentFacade,
      catalogFacade,
      invoiceFacade,
      checkoutRepository
    );

    const input: PlaceOrderInputDTO = {
      clientId: "1",
      deliveryAddress: {
        city: "San Francisco",
        number: "1",
        state: "State 01",
        street: "Street 01",
        zipcode: "88000-000",
      },
      products: [
        { productId: "1", quantity: 2 },
        { productId: "2", quantity: 1 },
      ],
    };
    const output = await placeOrderUsecase.execute(input);
    expect(output.invoiceId).toBeNull();
    expect(output.products).toStrictEqual(input.products);
    expect(output.status).toStrictEqual("declined");
    expect(output.total).toBe(30);
  });

  it("should process payment with status approved when value is more then 100", async () => {
    await ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Product description",
      price: 60,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await ProductModel.create({
      id: "2",
      name: "Product 2",
      description: "Product description",
      price: 50,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const clientFacade = ClientAdmFacadeFactory.create();
    const mockClient = jest.spyOn(clientFacade, "findClient");
    mockClient.mockImplementation(() =>
      Promise.resolve({
        id: "1",
        name: "Client test",
        email: "email@example.com",
        document: "1234567890",
        address: {
          street: "Address 1",
          number: "01",
          city: "city 01",
          state: "State 01",
          zipcode: "88008000",
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );
    const productFacade = ProductAdmFacadeFactory.create();
    const catalogFacade = StoreCatalogFacadeFactory.create();
    const paymentFacade = PaymentFacadeFactory.create();
    const checkoutRepository = new CheckoutRepositoryMemory();
    const invoiceFacade = InvoiceFacadeFactory.create();
    const placeOrderUsecase = new PlaceOrderUsecase(
      clientFacade,
      productFacade,
      paymentFacade,
      catalogFacade,
      invoiceFacade,
      checkoutRepository
    );

    const input: PlaceOrderInputDTO = {
      clientId: "1",
      deliveryAddress: {
        city: "San Francisco",
        number: "1",
        state: "State 01",
        street: "Street 01",
        zipcode: "88000-000",
      },
      products: [
        { productId: "1", quantity: 2 },
        { productId: "2", quantity: 1 },
      ],
    };
    const output = await placeOrderUsecase.execute(input);
    expect(output.invoiceId).toBeDefined();
    expect(output.products).toStrictEqual(input.products);
    expect(output.status).toStrictEqual("approved");
    expect(output.total).toBe(170);
  });
});

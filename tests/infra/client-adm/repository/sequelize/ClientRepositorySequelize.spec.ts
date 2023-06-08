import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import AddressModel from "../../../../../src/infra/client-adm/repository/sequelize/AddressModel";
import ClientModel from "../../../../../src/infra/client-adm/repository/sequelize/ClientModel";
import ClientRepositorySequelize from "../../../../../src/infra/client-adm/repository/sequelize/ClientRepositorySequelize";
import ProductModel from "../../../../../src/infra/product-adm/repository/sequelize/ProductModel";
import ProductRepositorySequelize from "../../../../../src/infra/product-adm/repository/sequelize/ProductRepositorySequelize";
import Client from "../../../../../src/modules/client-adm/entity/Client";
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
    sequelize.addModels([ClientModel, AddressModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const clientProps = {
      name: "Client 1",
      email: "test@example.com",
      address: {
        street: "Address 1",
        number: "01",
        city: "city 01",
        state: "State 01",
        zipcode: "88008000",
      },
    };
    const client = new Client(clientProps);
    const clientrepository = new ClientRepositorySequelize();
    const result = await clientrepository.add(client);
    expect(result.id).toBeDefined();
    expect(result.name).toBe(clientProps.name);
    expect(result.email).toBe(clientProps.email);
    expect(client.address.street).toBe(clientProps.address.street);
    expect(client.address.number).toBe(clientProps.address.number);
    expect(client.address.city).toBe(clientProps.address.city);
    expect(client.address.state).toBe(clientProps.address.state);
    expect(client.address.zipcode).toBe(clientProps.address.zipcode);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
  });

  it("should find a client adm sequelize", async () => {
    const clientProps = {
      name: "Client 1",
      email: "test@example.com",
      address: {
        street: "Address 1",
        number: "01",
        complement: "complement 01",
        city: "city 01",
        state: "State 01",
        zipcode: "88008000",
      },
    };
    const client = new Client(clientProps);
    const clientRepository = new ClientRepositorySequelize();
    await clientRepository.add(client);
    const clientDb = await clientRepository.find(client.id);
    expect(clientDb).toBeDefined();
    expect(client.address.street).toBe(clientProps.address.street);
    expect(client.address.number).toBe(clientProps.address.number);
    expect(client.address.city).toBe(clientProps.address.city);
    expect(client.address.state).toBe(clientProps.address.state);
    expect(client.address.zipcode).toBe(clientProps.address.zipcode);
    expect(client.address.complement).toBe(clientProps.address.complement);
    expect(clientDb.name).toBe(client.name);
    expect(clientDb.email).toBe(client.email);
    expect(clientDb.createdAt).toBeDefined();
  });
});

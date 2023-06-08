import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import ClientAdmFacadeFactory from "../../../../src/infra/client-adm/facade/ClientAdmFacadeFactory";
import AddressModel from "../../../../src/infra/client-adm/repository/sequelize/AddressModel";
import ClientModel from "../../../../src/infra/client-adm/repository/sequelize/ClientModel";

describe("ClientAdmFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    const configSequelize: SequelizeOptions = {
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    };
    sequelize = new Sequelize(configSequelize);
    sequelize.addModels([ClientModel, AddressModel]);
    await sequelize.sync();
  });

  it("should create a client ", async () => {
    const clientFacade = ClientAdmFacadeFactory.create();
    const input = {
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
    const addClientOutput = await clientFacade.addClient(input);

    const client = await clientFacade.findClient(addClientOutput.id);
    expect(client).toBeTruthy();
    expect(client.name).toBe(input.name);
    expect(client.email).toBe(input.email);
    expect(client.address.street).toBe(input.address.street);
    expect(client.address.number).toBe(input.address.number);
    expect(client.address.city).toBe(input.address.city);
    expect(client.address.state).toBe(input.address.state);
    expect(client.address.zipcode).toBe(input.address.zipcode);
    expect(client.address.complement).toBeNull();
    expect(client.createdAt).toBeDefined();
    expect(client.updatedAt).toBeDefined();
  });

  afterEach(async () => {
    await sequelize.close();
  });
});

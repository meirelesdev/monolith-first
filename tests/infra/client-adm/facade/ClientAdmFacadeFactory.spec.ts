import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import ClientAdmFacadeFactory from "../../../../src/infra/client-adm/facade/ClientAdmFacadeFactory";
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
    sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  it("should create a client ", async () => {
    const clientFacade = ClientAdmFacadeFactory.create();
    const input = {
      name: "Client 1",
      email: "test@example.com",
      address: "Address 1",
    };
    const addClientOutput = await clientFacade.addClient(input);

    const client = await clientFacade.findClient(addClientOutput.id);
    expect(client).toBeTruthy();
    expect(client.name).toBe(input.name);
    expect(client.email).toBe(input.email);
    expect(client.address).toBe(input.address);
    expect(client.createdAt).toBeDefined();
    expect(client.updatedAt).toBeDefined();
  });

  afterEach(async () => {
    await sequelize.close();
  });
});

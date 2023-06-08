import ClientRepositoryMemory from "../../../../../src/infra/client-adm/repository/memory/ClientRepositoryMemory";
import Client from "../../../../../src/modules/client-adm/entity/Client";

describe("Client repository memory test", () => {
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
    const clientRepository = new ClientRepositoryMemory();
    const result = await clientRepository.add(client);
    expect(result.id).toBe(client.id);
    expect(result.name).toBe(clientProps.name);
    expect(result.email).toBe(clientProps.email);
    expect(client.address.street).toBe(clientProps.address.street);
    expect(client.address.number).toBe(clientProps.address.number);
    expect(client.address.city).toBe(clientProps.address.city);
    expect(client.address.state).toBe(clientProps.address.state);
    expect(client.address.zipcode).toBe(clientProps.address.zipcode);
    expect(result.createdAt).toBeDefined();
  });

  it("should find a client adm memory", async () => {
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
    const clientRepository = new ClientRepositoryMemory();
    const savedclient = await clientRepository.add(client);

    const clientDb = await clientRepository.find(savedclient.id);
    expect(clientDb.id).toBe(savedclient.id);
    expect(clientDb.name).toBe(savedclient.name);
    expect(clientDb.email).toBe(savedclient.email);
    expect(client.address.street).toBe(clientProps.address.street);
    expect(client.address.number).toBe(clientProps.address.number);
    expect(client.address.city).toBe(clientProps.address.city);
    expect(client.address.state).toBe(clientProps.address.state);
    expect(client.address.zipcode).toBe(clientProps.address.zipcode);
    expect(clientDb.createdAt).toBe(savedclient.createdAt);
    expect(clientDb.updatedAt).toBe(savedclient.updatedAt);
  });
});

import ClientRepositoryMemory from "../../../../../src/infra/client-adm/repository/memory/ClientRepositoryMemory";
import Client from "../../../../../src/modules/client-adm/entity/Client";

describe("Client repository memory test", () => {
  it("should create a client", async () => {
    const clientProps = {
      name: "Client 1",
      email: "test@example.com",
      address: "Address 1",
    };
    const client = new Client(clientProps);
    const clientRepository = new ClientRepositoryMemory();
    const result = await clientRepository.add(client);
    expect(result.id).toBe(client.id);
    expect(result.name).toBe(clientProps.name);
    expect(result.email).toBe(clientProps.email);
    expect(result.address).toBe(clientProps.address);
    expect(result.createdAt).toBeDefined();
  });

  it("should find a client adm memory", async () => {
    const clientProps = {
      name: "Client 1",
      email: "test@example.com",
      address: "Address 1",
    };
    const client = new Client(clientProps);
    const clientRepository = new ClientRepositoryMemory();
    const savedclient = await clientRepository.add(client);

    const clientDb = await clientRepository.find(savedclient.id);
    expect(clientDb.id).toBe(savedclient.id);
    expect(clientDb.name).toBe(savedclient.name);
    expect(clientDb.email).toBe(savedclient.email);
    expect(clientDb.address).toBe(savedclient.address);
    expect(clientDb.createdAt).toBe(savedclient.createdAt);
    expect(clientDb.updatedAt).toBe(savedclient.updatedAt);
  });
});

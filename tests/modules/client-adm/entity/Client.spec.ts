import Client from "../../../../src/modules/client-adm/entity/Client";

describe("Client tests", () => {
  it("should create a client", () => {
    const clientProps = {
      name: "test client",
      email: "test@example.com",
      address: "Address 1",
    };
    const client = new Client(clientProps);
    expect(client.id).toBeDefined();
    expect(client.createdAt).toBeDefined();
    expect(client.updatedAt).toBeDefined();
  });
});

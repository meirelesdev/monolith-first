import Client from "../../../../src/modules/client-adm/entity/Client";

describe("Client tests", () => {
  it("should create a client", () => {
    const clientProps = {
      name: "test client",
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
    expect(client.id).toBeDefined();
    expect(client.createdAt).toBeDefined();
    expect(client.updatedAt).toBeDefined();
  });
});

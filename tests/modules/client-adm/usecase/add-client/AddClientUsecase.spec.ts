import ClientRepositoryMemory from "../../../../../src/infra/client-adm/repository/memory/ClientRepositoryMemory";
import AddClientUsecase from "../../../../../src/modules/client-adm/usecase/add-client/AddClientUsecase";

describe("Add client tests", () => {
  it("should create a client", async () => {
    const clientRepository = new ClientRepositoryMemory();
    const addClientUsecase = new AddClientUsecase(clientRepository);
    const input = {
      name: "test 1",
      email: "test@example.com",
      address: {
        street: "Address 1",
        number: "01",
        city: "city 01",
        state: "State 01",
        zipcode: "88008000",
      },
    };
    const output = await addClientUsecase.execute(input);
    expect(output.id).toBeDefined();
    expect(output.name).toBe(input.name);
    expect(output.email).toBe(input.email);
    expect(output.address.street).toBe(input.address.street);
    expect(output.address.number).toBe(input.address.number);
    expect(output.address.city).toBe(input.address.city);
    expect(output.address.state).toBe(input.address.state);
    expect(output.address.zipcode).toBe(input.address.zipcode);
    expect(output.createdAt).toBeDefined();
    expect(output.updatedAt).toBeDefined();
  });
});

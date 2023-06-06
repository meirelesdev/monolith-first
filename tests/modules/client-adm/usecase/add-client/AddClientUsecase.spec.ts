import ClientRepositoryMemory from "../../../../../src/infra/client-adm/repository/memory/ClientRepositoryMemory";
import AddClientUsecase from "../../../../../src/modules/client-adm/usecase/add-client/AddClientUsecase";

describe("Add client tests", () => {
  it("should create a client", async () => {
    const clientRepository = new ClientRepositoryMemory();
    const addClientUsecase = new AddClientUsecase(clientRepository);
    const input = {
      name: "test 1",
      email: "test@example.com",
      address: "Address 01",
    };
    const output = await addClientUsecase.execute(input);
    expect(output.id).toBeDefined();
    expect(output.name).toBe(input.name);
    expect(output.email).toBe(input.email);
    expect(output.address).toBe(input.address);
    expect(output.createdAt).toBeDefined();
    expect(output.updatedAt).toBeDefined();
  });
});

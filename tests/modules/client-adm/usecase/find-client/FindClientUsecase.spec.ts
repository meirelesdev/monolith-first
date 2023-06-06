import ClientRepositoryMemory from "../../../../../src/infra/client-adm/repository/memory/ClientRepositoryMemory";
import AddClientUsecase from "../../../../../src/modules/client-adm/usecase/add-client/AddClientUsecase";
import FindClientUsecase from "../../../../../src/modules/client-adm/usecase/find-client/FindClientUsecase";

describe("Add client tests", () => {
  it("should create a client", async () => {
    const clientRepository = new ClientRepositoryMemory();
    const addClientUsecase = new AddClientUsecase(clientRepository);
    const findClientUsecase = new FindClientUsecase(clientRepository);
    const input = {
      name: "test 1",
      email: "test@example.com",
      address: "Address 01",
    };
    const addClientOutput = await addClientUsecase.execute(input);

    const findClientOutput = await findClientUsecase.execute(addClientOutput.id);

    expect(findClientOutput.id).toBe(addClientOutput.id);
    expect(findClientOutput.name).toBe(input.name);
    expect(findClientOutput.email).toBe(input.email);
    expect(findClientOutput.address).toBe(input.address);
    expect(findClientOutput.createdAt).toBe(addClientOutput.createdAt);
    expect(findClientOutput.updatedAt).toBe(addClientOutput.updatedAt);
  });
});

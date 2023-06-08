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
      address: {
        street: "Address 1",
        number: "01",
        city: "city 01",
        state: "State 01",
        zipcode: "88008000",
      },
    };
    const addClientOutput = await addClientUsecase.execute(input);

    const findClientOutput = await findClientUsecase.execute(addClientOutput.id);

    expect(findClientOutput.id).toBe(addClientOutput.id);
    expect(findClientOutput.name).toBe(input.name);
    expect(findClientOutput.email).toBe(input.email);
    expect(findClientOutput.address.street).toBe(input.address.street);
    expect(findClientOutput.address.number).toBe(input.address.number);
    expect(findClientOutput.address.city).toBe(input.address.city);
    expect(findClientOutput.address.state).toBe(input.address.state);
    expect(findClientOutput.address.zipcode).toBe(input.address.zipcode);
    expect(findClientOutput.createdAt).toBe(addClientOutput.createdAt);
    expect(findClientOutput.updatedAt).toBe(addClientOutput.updatedAt);
  });
});

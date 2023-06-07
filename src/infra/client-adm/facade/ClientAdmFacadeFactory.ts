import AddClientUsecase from "../../../modules/client-adm/usecase/add-client/AddClientUsecase";
import FindClientUsecase from "../../../modules/client-adm/usecase/find-client/FindClientUsecase";
import ClientRepositoryMemory from "../repository/memory/ClientRepositoryMemory";
import ClientAdmFacade from "./ClientAdmFacade";

export default class ClientAdmFacadeFactory {
  static create() {
    const clientRepository = new ClientRepositoryMemory();
    const addClientUsecase = new AddClientUsecase(clientRepository);
    const findClientUsecase = new FindClientUsecase(clientRepository);
    return new ClientAdmFacade({
      addClientUsecase: addClientUsecase,
      findClientUsecase: findClientUsecase,
    });
  }
}

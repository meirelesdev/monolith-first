import ClientAdmFacadeInterface from "../../../modules/client-adm/facade/ClientAdmFacadeInterface";
import AddClientUsecase from "../../../modules/client-adm/usecase/add-client/AddClientUsecase";
import FindClientUsecase from "../../../modules/client-adm/usecase/find-client/FindClientUsecase";
import ClientRepositorySequelize from "../repository/sequelize/ClientRepositorySequelize";
import ClientAdmFacade from "./ClientAdmFacade";

export default class ClientAdmFacadeFactory {
  static create(): ClientAdmFacadeInterface {
    const clientRepository = new ClientRepositorySequelize();
    const addClientUsecase = new AddClientUsecase(clientRepository);
    const findClientUsecase = new FindClientUsecase(clientRepository);
    return new ClientAdmFacade({
      addClientUsecase: addClientUsecase,
      findClientUsecase: findClientUsecase,
    });
  }
}

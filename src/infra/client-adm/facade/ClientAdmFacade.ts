import UsecaseInterface from "../../../modules/@shared/domain/usecase/UsecaseInterface";
import ClientAdmFacadeInterface, {
  AddClientFacadeInputDTO,
  AddClientFacadeOutputDTO,
  FindClientFacadeOutputDTO,
  UsecasesClientFacadeProps,
} from "../../../modules/client-adm/facade/ClientAdmFacadeInterface";

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  #addClientUsecase: UsecaseInterface<AddClientFacadeInputDTO, AddClientFacadeOutputDTO>;
  #findClientUsecase: UsecaseInterface<string, FindClientFacadeOutputDTO>;
  #findAllClientsUsecase: any;
  constructor(usecasesProps: UsecasesClientFacadeProps) {
    this.#addClientUsecase = usecasesProps.addClientUsecase;
    this.#findClientUsecase = usecasesProps.findClientUsecase;
    this.#findAllClientsUsecase = usecasesProps.findAllClientsUsecase;
  }
  async findAllClients(): Promise<FindClientFacadeOutputDTO[]> {
    return this.#findAllClientsUsecase.execute();
  }
  async addClient(input: AddClientFacadeInputDTO): Promise<AddClientFacadeOutputDTO> {
    return this.#addClientUsecase.execute(input);
  }
  async findClient(input: string): Promise<FindClientFacadeOutputDTO> {
    return this.#findClientUsecase.execute(input);
  }
}

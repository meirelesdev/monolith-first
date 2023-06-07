import UsecaseInterface from "../../../modules/@shared/domain/usecase/UsecaseInterface";
import ClientAdmFacadeInterface, {
  AddClientInputDTO,
  AddClientOutputDTO,
  FindClientOutput,
  UsecasesClientFacadeProps,
} from "../../../modules/client-adm/facade/ClientAdmFacadeInterface";

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  #addClientUsecase: UsecaseInterface<AddClientInputDTO, AddClientOutputDTO>;
  #findClientUsecase: UsecaseInterface<string, FindClientOutput>;
  constructor(usecasesProps: UsecasesClientFacadeProps) {
    this.#addClientUsecase = usecasesProps.addClientUsecase;
    this.#findClientUsecase = usecasesProps.findClientUsecase;
  }
  async addClient(input: AddClientInputDTO): Promise<AddClientOutputDTO> {
    return this.#addClientUsecase.execute(input);
  }
  async findClient(input: string): Promise<FindClientOutput> {
    return this.#findClientUsecase.execute(input);
  }
}

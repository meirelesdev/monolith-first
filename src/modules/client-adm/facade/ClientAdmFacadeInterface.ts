import UseCaseInterface from "../../@shared/domain/usecase/UsecaseInterface";

export interface AddClientFacadeInputDTO {
  name: string;
  email: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    city: string;
    state: string;
    zipcode: string;
  };
}

export interface AddClientFacadeOutputDTO {
  id: string;
  name: string;
  email: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    city: string;
    state: string;
    zipcode: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
export interface FindClientFacadeOutputDTO {
  id: string;
  name: string;
  email: string;
  document?: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    city: string;
    state: string;
    zipcode: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface UsecasesClientFacadeProps {
  addClientUsecase: UseCaseInterface<AddClientFacadeInputDTO, AddClientFacadeOutputDTO>;
  findClientUsecase: UseCaseInterface<string, FindClientFacadeOutputDTO>;
  findAllClientsUsecase: UseCaseInterface<void, FindClientFacadeOutputDTO[]>;
}

export default interface ClientAdmFacadeInterface {
  addClient(input: AddClientFacadeInputDTO): Promise<AddClientFacadeOutputDTO>;
  findClient(input: string): Promise<FindClientFacadeOutputDTO>;
  findAllClients(): Promise<FindClientFacadeOutputDTO[]>;
}

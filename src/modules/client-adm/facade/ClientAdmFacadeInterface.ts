import UseCaseInterface from "../../@shared/domain/usecase/UsecaseInterface";

export interface AddClientInputDTO {
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

export interface AddClientOutputDTO {
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
export interface FindClientOutput {
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

export interface UsecasesClientFacadeProps {
  addClientUsecase: UseCaseInterface<AddClientOutputDTO, AddClientOutputDTO>;
  findClientUsecase: UseCaseInterface<string, FindClientOutput>;
}

export default interface ClientAdmFacadeInterface {
  addClient(input: AddClientInputDTO): Promise<AddClientOutputDTO>;
  findClient(input: string): Promise<FindClientOutput>;
}

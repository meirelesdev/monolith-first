import UsecaseInterface from "../../../@shared/domain/usecase/UsecaseInterface";
import Client from "../../entity/Client";
import ClientRepository from "../../repository/ClientRepository";

export interface AddClientInputDTO {
  name: string;
  email: string;
  document?: string;
  address?: {
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

export default class AddClientUsecase
  implements UsecaseInterface<AddClientInputDTO, AddClientOutputDTO>
{
  clientRepository: ClientRepository;
  constructor(clientRepository: ClientRepository) {
    this.clientRepository = clientRepository;
  }
  async execute(input: AddClientInputDTO): Promise<AddClientOutputDTO> {
    const props = {
      name: input.name,
      email: input.email,
      address: input.address,
    };
    const client = new Client(props);
    await this.clientRepository.add(client);
    return {
      id: client.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }
}

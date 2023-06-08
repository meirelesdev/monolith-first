import UsecaseInterface from "../../../@shared/domain/usecase/UsecaseInterface";
import ClientRepository from "../../repository/ClientRepository";

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
export default class FindClientUsecase implements UsecaseInterface<string, FindClientOutput> {
  clientRepository: ClientRepository;
  constructor(clientRepository: ClientRepository) {
    this.clientRepository = clientRepository;
  }
  async execute(id: string): Promise<FindClientOutput> {
    const client = await this.clientRepository.find(id);
    if (!client) throw new Error("Client not found");
    const { address } = client;
    return {
      id: client.id,
      name: client.name,
      email: client.email,
      address: {
        street: address.street,
        number: address.number,
        complement: address.complement,
        city: address.city,
        state: address.state,
        zipcode: address.zipcode,
      },
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }
}

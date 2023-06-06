import UsecaseInterface from "../../../@shared/domain/usecase/UsecaseInterface";
import ClientRepository from "../../repository/ClientRepository";

export interface FindClientOutput {
  id: string;
  name: string;
  email: string;
  address: string;
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

import UsecaseInterface from "../../../@shared/domain/usecase/UsecaseInterface";
import ClientRepository from "../../repository/ClientRepository";
import { FindClientOutput } from "../find-client/FindClientUsecase";

export default class FindAllClientsUsecase implements UsecaseInterface<void, FindClientOutput[]> {
  clientRepository: ClientRepository;
  constructor(clientRepository: ClientRepository) {
    this.clientRepository = clientRepository;
  }
  async execute(): Promise<FindClientOutput[]> {
    const clients = await this.clientRepository.findAll();
    const output = clients.map((client) => {
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
    });
    return output;
  }
}

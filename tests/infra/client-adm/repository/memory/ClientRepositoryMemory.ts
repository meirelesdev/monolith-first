import Client from "../../../../../src/modules/client-adm/entity/Client";
import ClientRepository from "../../../../../src/modules/client-adm/repository/ClientRepository";

export default class ClientRepositoryMemory implements ClientRepository {
  clients: Client[];
  constructor() {
    this.clients = [];
  }
  async add(client: Client): Promise<Client> {
    this.clients.push(client);
    return client;
  }
  async find(id: string): Promise<Client> {
    return this.clients.find((client) => client.id === id);
  }
}

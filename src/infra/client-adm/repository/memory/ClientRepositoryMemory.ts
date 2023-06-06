import Client from "../../../../modules/client-adm/entity/Client";
import ClientRepository from "../../../../modules/client-adm/repository/ClientRepository";

export default class ClientRepositoryMemory implements ClientRepository {
  clients: Client[];
  constructor() {
    this.clients = [];
  }
  async add(client: Client): Promise<void> {
    this.clients.push(client);
  }
  async find(id: string): Promise<Client> {
    return this.clients.find((client) => client.id === id);
  }
}

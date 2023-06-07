import Client from "../../../../modules/client-adm/entity/Client";
import ClientRepository from "../../../../modules/client-adm/repository/ClientRepository";
import ClientModel from "./ClientModel";

export default class ClientRepositorySequelize implements ClientRepository {
  clientModel: typeof ClientModel;

  constructor() {
    this.clientModel = ClientModel;
  }

  async add(client: Client): Promise<Client> {
    const clientModel = await this.clientModel.create({
      id: client.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    });
    return new Client({
      id: clientModel.id,
      name: clientModel.name,
      email: clientModel.email,
      address: clientModel.address,
      createdAt: clientModel.createdAt,
      updatedAt: clientModel.updatedAt,
    });
  }

  async find(id: string): Promise<Client> {
    const clientModel = await this.clientModel.findOne({
      where: {
        id,
      },
    });

    return new Client({
      id: clientModel.id,
      name: clientModel.name,
      address: clientModel.address,
      email: clientModel.email,
      createdAt: clientModel.createdAt,
      updatedAt: clientModel.updatedAt,
    });
  }
}

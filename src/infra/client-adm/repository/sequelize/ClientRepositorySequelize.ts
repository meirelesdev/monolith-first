import Client from "../../../../modules/client-adm/entity/Client";
import ClientRepository from "../../../../modules/client-adm/repository/ClientRepository";
import AddressModel from "./AddressModel";
import ClientModel from "./ClientModel";

export default class ClientRepositorySequelize implements ClientRepository {
  clientModel: typeof ClientModel;
  addressModel: typeof AddressModel;

  constructor() {
    this.clientModel = ClientModel;
    this.addressModel = AddressModel;
  }

  async add(client: Client): Promise<Client> {
    const clientModel = await this.clientModel.create({
      id: client.id,
      name: client.name,
      email: client.email,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    });
    const addressModel = await this.addressModel.create({
      client_id: client.id,
      street: client.address.street,
      number: client.address.number,
      complement: client.address.complement,
      city: client.address.city,
      state: client.address.state,
      zipcode: client.address.zipcode,
    });

    const clientSaved = new Client({
      id: clientModel.id,
      name: clientModel.name,
      email: clientModel.email,
      address: {
        street: addressModel.street,
        number: addressModel.number,
        complement: addressModel.complement,
        city: addressModel.city,
        state: addressModel.state,
        zipcode: addressModel.zipcode,
      },
      createdAt: clientModel.createdAt,
      updatedAt: clientModel.updatedAt,
    });
    return clientSaved;
  }

  async find(id: string): Promise<Client> {
    const clientModel = await this.clientModel.findOne({
      where: {
        id,
      },
    });
    if (!clientModel) throw new Error(`Client not found`);
    const addressModel = await this.addressModel.findOne({
      where: {
        client_id: clientModel.id,
      },
    });
    return new Client({
      id: clientModel.id,
      name: clientModel.name,
      address: addressModel,
      email: clientModel.email,
      createdAt: clientModel.createdAt,
      updatedAt: clientModel.updatedAt,
    });
  }
  async findAll(): Promise<Client[]> {
    const clientsModel = await this.clientModel.findAll();
    const result = [];
    for (const clientModel of clientsModel) {
      const addressModel = await this.addressModel.findOne({
        where: {
          client_id: clientModel.id,
        },
      });
      result.push(
        new Client({
          id: clientModel.id,
          name: clientModel.name,
          address: addressModel,
          email: clientModel.email,
          createdAt: clientModel.createdAt,
          updatedAt: clientModel.updatedAt,
        })
      );
    }
    return result;
  }
}

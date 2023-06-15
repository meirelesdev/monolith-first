import Client from "../entity/Client";

export default interface ClientRepository {
  add(client: Client): Promise<Client>;
  find(id: string): Promise<Client>;
  findAll(): Promise<Client[]>;
}

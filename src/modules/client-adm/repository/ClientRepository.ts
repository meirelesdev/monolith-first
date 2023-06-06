import Client from "../entity/Client";

export default interface ClientRepository {
  add(client: Client): Promise<void>;
  find(id: string): Promise<Client>;
}

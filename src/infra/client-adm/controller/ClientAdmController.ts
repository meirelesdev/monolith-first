import ClientAdmFacadeInterface from "../../../modules/client-adm/facade/ClientAdmFacadeInterface";

export default class ClientAdmController {
  clientFacade: ClientAdmFacadeInterface;
  constructor(clientFacade: ClientAdmFacadeInterface) {
    this.clientFacade = clientFacade;
  }
  async index() {
    return this.clientFacade.findAllClients();
  }

  async show(params: any) {
    return this.clientFacade.findClient(params.id);
  }
  async store(_params: any, body: any): Promise<any> {
    const input = {
      name: body.name,
      email: body.email,
      address: {
        street: body.street,
        number: body.number,
        complement: body.complement,
        city: body.city,
        state: body.state,
        zipcode: body.zipcode,
      },
    };
    const output = await this.clientFacade.addClient(input);
    return output;
  }
}

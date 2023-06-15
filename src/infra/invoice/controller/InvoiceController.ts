import InvoiceFacadeInterface from "../../../modules/invoice/facade/InvoiceFacadeInterface";

export default class InvoiceController {
  invoiceFacade: InvoiceFacadeInterface;
  constructor(invoiceFacade: InvoiceFacadeInterface) {
    this.invoiceFacade = invoiceFacade;
  }
  async store(_params: any, body: any): Promise<any> {
    const input = {
      document: body.document,
      street: body.street,
      number: body.number,
      city: body.city,
      name: body.name,
      state: body.state,
      zipCode: body.zip_code,
      items: body.items.map((item: any) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.amount,
      })),
    };
    const output = await this.invoiceFacade.create(input);
    return output;
  }
}

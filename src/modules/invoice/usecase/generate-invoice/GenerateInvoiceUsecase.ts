import UsecaseInterface from "../../../@shared/domain/usecase/UsecaseInterface";
import OrderItem from "../../../checkout/entity/OrderItem";
import ProductAdmFacadeInterface from "../../../product-adm/facade/ProductAdmFacadeInterface";
import StoreCatalogFacadeInterface from "../../../store-catalog/facade/StoreCatalogFacadeInterface";
import Invoice from "../../entity/Invoice";
import InvoiceRepository from "../../repository/InvoiceRepository";
import InvoiceItem from "../../value-object/InvoiceItem";
import { InvoiceInputDTO, InvoiceOutputDTO } from "./GenerateInvoiceDTO";

export default class GenerateInvoiceUsecase
  implements UsecaseInterface<InvoiceInputDTO, InvoiceOutputDTO>
{
  #invoiceRepository: InvoiceRepository;
  #storeCatalogFacade: StoreCatalogFacadeInterface;
  constructor(
    storeCatalogFacade: StoreCatalogFacadeInterface,
    invoiceRepository: InvoiceRepository
  ) {
    this.#storeCatalogFacade = storeCatalogFacade;
    this.#invoiceRepository = invoiceRepository;
  }
  async execute(input: InvoiceInputDTO): Promise<InvoiceOutputDTO> {
    const invoiceProps = {
      name: input.name,
      document: input.document,
      address: {
        street: input.street,
        number: input.number,
        complement: input.complement,
        city: input.city,
        state: input.state,
        zipcode: input.zipCode,
      },
    };
    const invoice = new Invoice(invoiceProps);
    for (const item of input.items) {
      const product = await this.#storeCatalogFacade.getProduct({ productId: item.id });
      const orderItem = new InvoiceItem({
        productId: product.id,
        name: item.name,
        price: product.salesPrice,
        quantity: item.quantity,
      });
      invoice.addItem(orderItem);
    }
    await this.#invoiceRepository.save(invoice);
    return {
      transactionId: invoice.id,
      name: invoice.name,
      document: invoice.document,
      street: input.street,
      number: input.number,
      complement: input.complement,
      city: input.city,
      state: input.state,
      zipCode: input.zipCode,
      items: invoice.getItems(),
      total: invoice.getTotal(),
    };
  }
}

import UsecaseInterface from "../../../@shared/domain/usecase/UsecaseInterface";
import ClientAdmFacadeInterface from "../../../client-adm/facade/ClientAdmFacadeInterface";
import InvoiceFacadeInterface from "../../../invoice/facade/InvoiceFacadeInterface";
import PaymentFacadeInterface from "../../../payment/facade/PaymentFacadeInterface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/ProductAdmFacadeInterface";
import StoreCatalogFacadeInterface from "../../../store-catalog/facade/StoreCatalogFacadeInterface";
import Client from "../../entity/Client";
import Order from "../../entity/Order";
import OrderItem from "../../entity/OrderItem";
import CheckoutRepository from "../../repository/CheckoutRepository";
import { PlaceOrderInputDTO, PlaceOrderOutputDTO } from "./PlaceOrderDTO";

export default class PlaceOrderUsecase
  implements UsecaseInterface<PlaceOrderInputDTO, PlaceOrderOutputDTO>
{
  #clientFacade: ClientAdmFacadeInterface;
  #productFacade: ProductAdmFacadeInterface;
  #storeCatalog: StoreCatalogFacadeInterface;
  #checkoutRepository: CheckoutRepository;
  #invoiceFacade: InvoiceFacadeInterface;
  #paymentFacade: PaymentFacadeInterface;
  constructor(
    clientFacade: ClientAdmFacadeInterface,
    productFacade: ProductAdmFacadeInterface,
    paymentFacade: PaymentFacadeInterface,
    storeCatalog: StoreCatalogFacadeInterface,
    checkoutRepository: CheckoutRepository
  ) {
    this.#clientFacade = clientFacade;
    this.#productFacade = productFacade;
    this.#paymentFacade = paymentFacade;
    this.#storeCatalog = storeCatalog;
    this.#checkoutRepository = checkoutRepository;
  }
  async execute(input: PlaceOrderInputDTO): Promise<PlaceOrderOutputDTO> {
    const clientData = await this.#clientFacade.findClient(input.clientId);
    await this.validateProducts(input);
    const orderItems = await Promise.all(input.products.map(async (p) => await this.getProduct(p)));
    const clientProps = {
      id: clientData.id,
      name: clientData.name,
      email: clientData.email,
      document: clientData.document,
      address: clientData.address,
    };
    const client = new Client(clientProps);
    const order = new Order({
      client,
      items: orderItems,
    });
    const payment = await this.#paymentFacade.process({ amount: order.total, orderId: order.id });
    if (payment.status === "approved") {
      const invoice = await this.#invoiceFacade.create({
        name: client.name,
        document: client.document,
        street: client.address.street,
        number: client.address.number,
        city: client.address.city,
        state: client.address.state,
        zipcode: client.address.zipcode,
        items: orderItems,
      });
    }
    await this.#checkoutRepository.addOrder(order);

    return {
      id: order.id,
      invoiceId: null,
      products: input.products,
      status: payment.status,
      total: payment.amount,
    };
  }
  private async validateProducts(input: PlaceOrderInputDTO): Promise<void> {
    if (!input.products.length) throw new Error("No products selected");
    for (const inputProduct of input.products) {
      const product = await this.#productFacade.checkStock({ productId: inputProduct.productId });
      if (product.stock < inputProduct.quantity) {
        throw new Error(`Product ${inputProduct.productId} is not available in stock`);
      }
    }
  }

  private async getProduct(input: { productId: string; quantity: number }): Promise<OrderItem> {
    const catalogProduct = await this.#storeCatalog.getProduct({
      productId: input.productId,
    });
    return new OrderItem({
      id: catalogProduct.id,
      name: catalogProduct.name,
      description: catalogProduct.description,
      price: catalogProduct.salesPrice,
      quantity: input.quantity,
    });
  }
}

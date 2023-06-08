import UsecaseInterface from "../../../@shared/domain/usecase/UsecaseInterface";
import ClientAdmFacadeInterface from "../../../client-adm/facade/ClientAdmFacadeInterface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/ProductAdmFacadeInterface";
import StoreCatalogFacadeInterface from "../../../store-catalog/facade/StoreCatalogFacadeInterface";
import Client from "../../entity/Client";
import Product from "../../entity/Product";
import { PlaceOrderInputDTO, PlaceOrderOutputDTO } from "./PlaceOrderDTO";

export default class PlaceOrderUsecase
  implements UsecaseInterface<PlaceOrderInputDTO, PlaceOrderOutputDTO>
{
  #clientFacade: ClientAdmFacadeInterface;
  #productFacade: ProductAdmFacadeInterface;
  #storeCatalog: StoreCatalogFacadeInterface;
  constructor(
    clientFacade: ClientAdmFacadeInterface,
    productFacade: ProductAdmFacadeInterface,
    storeCatalog: StoreCatalogFacadeInterface
  ) {
    this.#clientFacade = clientFacade;
    this.#productFacade = productFacade;
    this.#storeCatalog = storeCatalog;
  }
  async execute(input: PlaceOrderInputDTO): Promise<PlaceOrderOutputDTO> {
    const clientData = await this.#clientFacade.findClient(input.clientId);
    await this.validateProducts(input);
    const products = await Promise.all(
      input.products.map(async (p) => await this.getProduct(p.productId))
    );
    const clientProps = {
      id: clientData.id,
      name: clientData.name,
      email: clientData.email,
      address: clientData.address,
    };
    const client = new Client(clientProps);
    console.log(products);
    return {
      id: "",
      invoiceId: "",
      products: [],
      status: "pending",
      total: 0,
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

  private async getProduct(id: string): Promise<Product> {
    const catalogProduct = await this.#storeCatalog.getProduct({
      productId: id,
    });
    return new Product({
      id: catalogProduct.id,
      name: catalogProduct.name,
      description: catalogProduct.description,
      salesPrice: catalogProduct.salesPrice,
      createdAt: catalogProduct.createdAt,
      updatedAt: catalogProduct.updatedAt,
    });
  }
}

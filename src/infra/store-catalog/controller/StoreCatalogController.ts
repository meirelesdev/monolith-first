import StoreCatalogFacadeInterface from "../../../modules/store-catalog/facade/StoreCatalogFacadeInterface";

export default class StoreCatalogController {
  storeCatalogFacade: StoreCatalogFacadeInterface;
  constructor(storeCatalogFacade: StoreCatalogFacadeInterface) {
    this.storeCatalogFacade = storeCatalogFacade;
  }
  async index() {
    return this.storeCatalogFacade.findAllProducts();
  }
  async show(params: any): Promise<any> {
    const input = {
      productId: params.id,
    };
    const output = await this.storeCatalogFacade.getProduct(input);
    return output;
  }
}

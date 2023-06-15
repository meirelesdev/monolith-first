import ProductAdmFacadeInterface from "../../../modules/product-adm/facade/ProductAdmFacadeInterface";

export default class ProductAdmController {
  productFacade: ProductAdmFacadeInterface;
  constructor(productFacade: ProductAdmFacadeInterface) {
    this.productFacade = productFacade;
  }
  async checkStock(params: any) {
    const input = {
      productId: params.id,
    };
    return this.productFacade.checkStock(input);
  }
  async store(_params: any, body: any): Promise<any> {
    const input = {
      name: body.name,
      description: body.description,
      purchasePrice: body.price,
      stock: body.stock,
    };
    const output = await this.productFacade.addProduct(input);
    return output;
  }
}

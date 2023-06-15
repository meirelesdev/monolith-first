import ClientAdmFacadeInterface from "../../modules/client-adm/facade/ClientAdmFacadeInterface";
import InvoiceFacadeInterface from "../../modules/invoice/facade/InvoiceFacadeInterface";
import PaymentFacadeInterface from "../../modules/payment/facade/PaymentFacadeInterface";
import ProductAdmFacadeInterface from "../../modules/product-adm/facade/ProductAdmFacadeInterface";
import StoreCatalogFacadeInterface from "../../modules/store-catalog/facade/StoreCatalogFacadeInterface";
import ClientAdmFacadeFactory from "../client-adm/facade/ClientAdmFacadeFactory";
import InvoiceFacadeFactory from "../invoice/facade/InvoiceFacadeFactory";
import PaymentFacadeFactory from "../payment/facade/PaymentFacadeFactory";
import ProductAdmFacadeFactory from "../product-adm/facade/ProductAdmFacadeFactory";
import StoreCatalogFacadeFactory from "../store-catalog/facade/StoreCatalogFacadeFactory";
import ModuleFactoryInterface from "./ModuleFactoryInterface";

export default class ModulesFactory implements ModuleFactoryInterface {
  createCustomerModule(): ClientAdmFacadeInterface {
    return ClientAdmFacadeFactory.create();
  }
  createProductModule(): ProductAdmFacadeInterface {
    return ProductAdmFacadeFactory.create();
  }
  createStoreCatalogModule(): StoreCatalogFacadeInterface {
    return StoreCatalogFacadeFactory.create();
  }
  createPaymentModule(): PaymentFacadeInterface {
    return PaymentFacadeFactory.create();
  }
  createInvoiceModule(): InvoiceFacadeInterface {
    return InvoiceFacadeFactory.create();
  }
}

import ClientAdmFacadeInterface from "../../modules/client-adm/facade/ClientAdmFacadeInterface";
import InvoiceFacadeInterface from "../../modules/invoice/facade/InvoiceFacadeInterface";
import PaymentFacadeInterface from "../../modules/payment/facade/PaymentFacadeInterface";
import ProductAdmFacadeInterface from "../../modules/product-adm/facade/ProductAdmFacadeInterface";
import StoreCatalogFacadeInterface from "../../modules/store-catalog/facade/StoreCatalogFacadeInterface";

export default interface ModuleFactoryInterface {
  createCustomerModule(): ClientAdmFacadeInterface;
  createProductModule(): ProductAdmFacadeInterface;
  createStoreCatalogModule(): StoreCatalogFacadeInterface;
  createPaymentModule(): PaymentFacadeInterface;
  createInvoiceModule(): InvoiceFacadeInterface;
}

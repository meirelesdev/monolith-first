import InvoiceRepositoryMemory from "../../../../tests/modules/invoice/repository/InvoiceRepositoryMemory";
import InvoiceFacadeInterface from "../../../modules/invoice/facade/InvoiceFacadeInterface";
import GenerateInvoiceUsecase from "../../../modules/invoice/usecase/generate-invoice/GenerateInvoiceUsecase";

import StoreCatalogFacadeFactory from "../../store-catalog/facade/StoreCatalogFacadeFactory";
import InvoiceFacade from "./InvoiceFacade";

export default class InvoiceFacadeFactory {
  static create(): InvoiceFacadeInterface {
    const invoiceRepository = new InvoiceRepositoryMemory();
    const storeCatalog = StoreCatalogFacadeFactory.create();
    const gerenateInvoiceUsecase = new GenerateInvoiceUsecase(storeCatalog, invoiceRepository);
    return new InvoiceFacade(gerenateInvoiceUsecase);
  }
}

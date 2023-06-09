import Invoice from "../../../../src/modules/invoice/entity/Invoice";
import InvoiceRepository from "../../../../src/modules/invoice/repository/InvoiceRepository";

export default class InvoiceRepositoryMemory implements InvoiceRepository {
  invoices: Invoice[];
  constructor() {
    this.invoices = [];
  }
  async save(invoice: Invoice): Promise<void> {
    this.invoices.push(invoice);
  }
  async find(id: string): Promise<Invoice> {
    return this.invoices.find((invoice) => invoice.id === id);
  }
}

import Invoice from "../entity/Invoice";

export default interface InvoiceRepository {
  save(invoice: Invoice): Promise<void>;
  find(id: string): Promise<Invoice>;
}

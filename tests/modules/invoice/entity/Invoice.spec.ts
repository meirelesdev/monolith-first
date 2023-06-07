import Invoice from "../../../../src/modules/invoice/entity/Invoice";
import InvoiceItem from "../../../../src/modules/invoice/value-object/InvoiceItem";

describe("Invoices tests", () => {
  it("should create an invoice", () => {
    const invoiceProps = {
      name: "invoice 1",
      document: "Document 1",
      address: {
        street: "Street 1",
        number: "Number 1",
        complement: "Complement 1",
        city: "City 1",
        state: "State 1",
        zipcode: "88000000",
      },
    };
    const invoice = new Invoice(invoiceProps);
    const itemsProps = [
      {
        productId: "1",
        name: "Product 1",
        price: 100,
        quantity: 1,
      },
    ];
    for (const itemProps of itemsProps) {
      const invoiceItem = new InvoiceItem(itemProps);
      invoice.addItem(invoiceItem);
    }
    const total = invoice.getTotal();
    expect(invoice.id).toBeDefined();
    expect(total).toBe(100);
    const address = `${invoiceProps.address.street}, ${invoiceProps.address.number}, ${invoiceProps.address.zipcode}, ${invoiceProps.address.complement}, ${invoiceProps.address.city}, ${invoiceProps.address.state}.`;
    expect(invoice.address).toBe(address);
    expect(invoice.document).toBe(invoiceProps.document);
    expect(invoice.name).toBe(invoiceProps.name);
    expect(invoice.createdAt).toBeDefined();
    expect(invoice.updatedAt).toBeDefined();
  });

  it("should not be able to create an invoice whit addres incomplete address", () => {
    const invoiceProps = {
      name: "invoice 1",
      document: "Document 1",
      address: {
        street: "Street 1",
        number: "",
        complement: "Complement 1",
        city: "City 1",
        state: "State 1",
        zipcode: "88000000",
      },
    };
    expect(() => new Invoice(invoiceProps)).toThrow(new Error("Invalid Address"));
  });
});

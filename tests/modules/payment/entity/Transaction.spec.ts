import Transaction from "../../../../src/modules/payment/entity/Transaction";

describe("Transaction tests", () => {
  it("should not be able to create a transaction if amount is zero", () => {
    const txProps = {
      amount: 0,
      orderId: "123",
    };
    expect(() => new Transaction(txProps)).toThrow(new Error("Amount must be greater then 0"));
  });

  it("should not be able to create a transaction if amount less then zero", () => {
    const txProps = {
      amount: -10,
      orderId: "123",
    };
    expect(() => new Transaction(txProps)).toThrow(new Error("Amount must be greater then 0"));
  });

  it("should create a transaction", () => {
    const txProps = {
      amount: 10,
      orderId: "123",
    };
    const transaction = new Transaction(txProps);
    expect(transaction.id).toBeDefined();
    expect(transaction.amount).toBe(txProps.amount);
    expect(transaction.orderId).toBe(txProps.orderId);
    expect(transaction.status).toBe("pending");
    expect(transaction.createdAt).toBeDefined();
    expect(transaction.updatedAt).toBeDefined();
  });

  it("should process a transaction and decline", () => {
    const txProps = {
      amount: 10,
      orderId: "123",
    };
    const transaction = new Transaction(txProps);
    transaction.process();
    expect(transaction.id).toBeDefined();
    expect(transaction.amount).toBe(txProps.amount);
    expect(transaction.orderId).toBe(txProps.orderId);
    expect(transaction.status).toBe("declined");
    expect(transaction.createdAt).toBeDefined();
    expect(transaction.updatedAt).toBeDefined();
  });
  it("should process a transaction and approve", () => {
    const txProps = {
      amount: 100,
      orderId: "123",
    };
    const transaction = new Transaction(txProps);
    transaction.process();
    expect(transaction.id).toBeDefined();
    expect(transaction.amount).toBe(txProps.amount);
    expect(transaction.orderId).toBe(txProps.orderId);
    expect(transaction.status).toBe("approved");
    expect(transaction.createdAt).toBeDefined();
    expect(transaction.updatedAt).toBeDefined();
  });
});

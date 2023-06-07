import TransactionRepositoryMemory from "../../../../src/infra/payment/repository/memory/TransactionRepositoryMemory";
import ProcessPayment from "../../../../src/modules/payment/usecase/ProcessPayment";

describe("Transactions usecase test", () => {
  it("should process a transaction with a transaction id and status approved", async () => {
    const transactionRepository = new TransactionRepositoryMemory();
    const usecaseProcessPayment = new ProcessPayment(transactionRepository);
    const input = {
      orderId: "123",
      amount: 100,
    };

    const output = await usecaseProcessPayment.execute(input);
    expect(output.transactionId).toBeDefined();
    expect(output.amount).toEqual(input.amount);
    expect(output.status).toEqual("approved");
    expect(output.createdAt).toBeDefined();
    expect(output.updatedAt).toBeDefined();
  });

  it("should process a transaction with status declined", async () => {
    const transactionRepository = new TransactionRepositoryMemory();
    const usecaseProcessPayment = new ProcessPayment(transactionRepository);

    const input = {
      orderId: "123",
      amount: 60,
    };

    const output = await usecaseProcessPayment.execute(input);
    expect(output.transactionId).toBeDefined();
    expect(output.amount).toEqual(input.amount);
    expect(output.status).toEqual("declined");
    expect(output.createdAt).toBeDefined();
    expect(output.updatedAt).toBeDefined();
  });

  it("should not be able to process a transaction with amount less then zero", async () => {
    const transactionRepository = new TransactionRepositoryMemory();
    const usecaseProcessPayment = new ProcessPayment(transactionRepository);
    const input = {
      orderId: "123",
      amount: 0,
    };

    await expect(() => usecaseProcessPayment.execute(input)).rejects.toThrow(
      new Error("Amount must be greater then 0")
    );
  });
});

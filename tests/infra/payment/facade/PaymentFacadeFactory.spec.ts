import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import PaymentFacadeFactory from "../../../../src/infra/payment/facade/PaymentFacadeFactory";
import TransactionModel from "../../../../src/infra/payment/repository/sequelize/TransactionModel";

describe("PaymentFacadeFactory test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    const configSequelize: SequelizeOptions = {
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    };
    sequelize = new Sequelize(configSequelize);
    sequelize.addModels([TransactionModel]);
    await sequelize.sync();
  });

  it("should process a transaction ", async () => {
    const paymentFacade = PaymentFacadeFactory.create();
    const input = {
      orderId: "123",
      amount: 100,
    };
    const outputProcessPayment = await paymentFacade.process(input);
    expect(outputProcessPayment).toBeTruthy();
    expect(outputProcessPayment.transactionId).toBeDefined();
    expect(outputProcessPayment.amount).toBe(input.amount);
    expect(outputProcessPayment.status).toBe("approved");
  });

  afterEach(async () => {
    await sequelize.close();
  });
});

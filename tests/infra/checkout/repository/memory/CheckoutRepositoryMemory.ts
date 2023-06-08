import Order from "../../../../../src/modules/checkout/entity/Order";
import CheckoutRepository from "../../../../../src/modules/checkout/repository/CheckoutRepository";

export default class CheckoutRepositoryMemory implements CheckoutRepository {
  orders: Order[];
  constructor() {
    this.orders = [];
  }
  async addOrder(order: Order): Promise<void> {
    this.orders.push(order);
  }
  async findOrder(id: string): Promise<Order> {
    const order = this.orders.find((order) => id === order.id);
    return order;
  }
}

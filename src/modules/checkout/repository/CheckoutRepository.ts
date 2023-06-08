import Order from "../entity/Order";

export default interface CheckoutRepository {
  addOrder(order: Order): Promise<void>;
  findOrder(id: string): Promise<Order>;
}

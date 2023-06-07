import UsecaseInterface from "../../../modules/@shared/domain/usecase/UsecaseInterface";
import PaymentFacadeInterface, {
  PaymentFacadeInputDTO,
  PaymentFacadeOutputDTO,
} from "../../../modules/payment/facade/PaymentFacadeInterface";

export default class PaymentFacade implements PaymentFacadeInterface {
  #processPayment: UsecaseInterface<PaymentFacadeInputDTO, PaymentFacadeOutputDTO>;
  constructor(
    processPaymentUsecase: UsecaseInterface<PaymentFacadeInputDTO, PaymentFacadeOutputDTO>
  ) {
    this.#processPayment = processPaymentUsecase;
  }
  async process(input: PaymentFacadeInputDTO): Promise<PaymentFacadeOutputDTO> {
    return this.#processPayment.execute(input);
  }
}

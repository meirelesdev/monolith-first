import UsecaseInterface from "../../../modules/@shared/domain/usecase/UsecaseInterface";
import InvoiceFacadeInterface, {
  InvoiceFacadeInputDTO,
  InvoiceFacadeOutputDTO,
} from "../../../modules/invoice/facade/InvoiceFacadeInterface";

export default class InvoiceFacade implements InvoiceFacadeInterface {
  #generateInvoice: UsecaseInterface<InvoiceFacadeInputDTO, InvoiceFacadeOutputDTO>;
  constructor(generateInvoice: UsecaseInterface<InvoiceFacadeInputDTO, InvoiceFacadeOutputDTO>) {
    this.#generateInvoice = generateInvoice;
  }
  async create(input: InvoiceFacadeInputDTO): Promise<InvoiceFacadeOutputDTO> {
    return this.#generateInvoice.execute(input);
  }
}

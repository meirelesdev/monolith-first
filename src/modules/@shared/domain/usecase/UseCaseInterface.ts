export default interface UseCaseInterface<InputDTO, OutputDTO> {
  execute(input: InputDTO): Promise<OutputDTO>;
}

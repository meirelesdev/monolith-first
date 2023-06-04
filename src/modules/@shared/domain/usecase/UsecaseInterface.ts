export default interface UsecaseInterface<InputDTO, OutputDTO> {
  execute(input: InputDTO): Promise<OutputDTO>;
}

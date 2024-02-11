export class ChangeQuestionaireNameCommand {
  constructor(
    public readonly questionaireId: string,
    public readonly name: string
  ) {}
}

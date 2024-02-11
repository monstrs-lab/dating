export class CreateQuestionaireCommand {
  constructor(
    public readonly questionaireId: string,
    public readonly name: string
  ) {}
}

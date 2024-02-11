export class AddQuestionaireQuestionCommand {
  constructor(
    public readonly questionaireId: string,
    public readonly content: string
  ) {}
}

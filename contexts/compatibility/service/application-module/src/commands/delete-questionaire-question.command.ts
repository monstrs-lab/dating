export class DeleteQuestionaireQuestionCommand {
  constructor(
    public readonly questionaireId: string,
    public readonly questionId: string
  ) {}
}

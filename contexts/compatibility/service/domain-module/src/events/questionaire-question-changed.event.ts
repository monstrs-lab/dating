export class QuestionaireQuestionChangedEvent {
  constructor(
    public readonly questionaireId: string,
    public readonly questionId: string,
    public readonly content: string
  ) {}
}

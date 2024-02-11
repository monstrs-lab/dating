export class QuestionaireQuestionDeletedEvent {
  constructor(
    public readonly questionaireId: string,
    public readonly questionId: string
  ) {}
}

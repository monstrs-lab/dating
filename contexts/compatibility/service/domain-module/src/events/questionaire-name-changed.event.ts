export class QuestionaireNameChangedEvent {
  constructor(
    public readonly questionaireId: string,
    public readonly name: string
  ) {}
}

import type { QuestionaireStatus } from '../enums/index.js'

export class QuestionaireCreatedEvent {
  constructor(
    public readonly questionaireId: string,
    public readonly status: QuestionaireStatus,
    public readonly name: string,
    public readonly createdAt: Date
  ) {}
}

import type { QuestionaireStatus } from '../enums/index.js'

export class QuestionaireDeactivatedEvent {
  constructor(
    public readonly questionaireId: string,
    public readonly status: QuestionaireStatus
  ) {}
}

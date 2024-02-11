import type { QuestionaireStatus } from '../enums/index.js'

export class QuestionaireActivatedEvent {
  constructor(
    public readonly questionaireId: string,
    public readonly status: QuestionaireStatus
  ) {}
}

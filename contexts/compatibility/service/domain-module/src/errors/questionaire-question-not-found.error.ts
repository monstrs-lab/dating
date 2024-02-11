import { DomainError } from '@monstrs/core-errors'

export class QuestionaireQuestionNotFound extends DomainError {
  constructor(id: string) {
    super()
    this.message = `Questionare question with id: ${id} - not found.`
  }
}

import { DomainError } from '@monstrs/core-errors'

export class SurveyAlreadyCompletedError extends DomainError {
  constructor(id: string) {
    super()
    this.message = `Survey ${id} already completed.`
  }
}

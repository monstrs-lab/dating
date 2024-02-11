import type { DeleteQuestionaireQuestionRequest } from '@compatibility/compatibility-rpc/interfaces'

import { IsUUID }                                 from 'class-validator'

export class DeleteQuestionaireQuestionPayload {
  constructor(private readonly request: DeleteQuestionaireQuestionRequest) {}

  @IsUUID(4)
  get questionaireId(): string {
    return this.request.questionaireId
  }

  @IsUUID(4)
  get questionId(): string {
    return this.request.questionId
  }
}

import type { ChangeQuestionaireQuestionRequest } from '@compatibility/compatibility-rpc/interfaces'

import { IsNotEmpty }                             from 'class-validator'
import { IsUUID }                                 from 'class-validator'

export class ChangeQuestionaireQuestionPayload {
  constructor(private readonly request: ChangeQuestionaireQuestionRequest) {}

  @IsUUID(4)
  get questionaireId(): string {
    return this.request.questionaireId
  }

  @IsUUID(4)
  get questionId(): string {
    return this.request.questionId
  }

  @IsNotEmpty()
  get content(): string {
    return this.request.content
  }
}

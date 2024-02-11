import type { AddQuestionaireQuestionRequest } from '@compatibility/compatibility-rpc/interfaces'

import { IsNotEmpty }                          from 'class-validator'
import { IsUUID }                              from 'class-validator'

export class AddQuestionaireQuestionPayload {
  constructor(private readonly request: AddQuestionaireQuestionRequest) {}

  @IsUUID(4)
  get questionaireId(): string {
    return this.request.questionaireId
  }

  @IsNotEmpty()
  get content(): string {
    return this.request.content
  }
}

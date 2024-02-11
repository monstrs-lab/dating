import type { ChangeQuestionaireNameRequest } from '@compatibility/compatibility-rpc/interfaces'

import { IsNotEmpty }                         from 'class-validator'
import { IsUUID }                             from 'class-validator'

export class ChangeQuestionaireNamePayload {
  constructor(private readonly request: ChangeQuestionaireNameRequest) {}

  @IsUUID(4)
  get questionaireId(): string {
    return this.request.questionaireId
  }

  @IsNotEmpty()
  get name(): string {
    return this.request.name
  }
}

import type { ActivateQuestionaireRequest } from '@compatibility/compatibility-rpc/interfaces'

import { IsUUID }                           from 'class-validator'

export class ActivateQuestionairePayload {
  constructor(private readonly request: ActivateQuestionaireRequest) {}

  @IsUUID(4)
  get questionaireId(): string {
    return this.request.questionaireId
  }
}

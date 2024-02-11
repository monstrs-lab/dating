import type { DeactivateQuestionaireRequest } from '@compatibility/compatibility-rpc/interfaces'

import { IsUUID }                             from 'class-validator'

export class DeactivateQuestionairePayload {
  constructor(private readonly request: DeactivateQuestionaireRequest) {}

  @IsUUID(4)
  get questionaireId(): string {
    return this.request.questionaireId
  }
}

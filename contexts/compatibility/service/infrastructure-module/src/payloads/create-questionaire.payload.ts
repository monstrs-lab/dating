import type { CreateQuestionaireRequest } from '@compatibility/compatibility-rpc/interfaces'

import { IsNotEmpty }                     from 'class-validator'

export class CreateQuestionairePayload {
  constructor(private readonly request: CreateQuestionaireRequest) {}

  @IsNotEmpty()
  get name(): string {
    return this.request.name
  }
}

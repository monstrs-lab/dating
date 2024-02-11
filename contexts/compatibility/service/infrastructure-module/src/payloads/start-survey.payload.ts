import type { StartSurveyRequest } from '@compatibility/compatibility-rpc/interfaces'

import { IsUUID }                  from 'class-validator'

export class StartSurveyPayload {
  constructor(private readonly request: StartSurveyRequest) {}

  @IsUUID(4)
  get intervieweeId(): string {
    return this.request.intervieweeId
  }

  @IsUUID(4)
  get questionaireId(): string {
    return this.request.questionaireId
  }
}

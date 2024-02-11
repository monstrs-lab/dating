import type { AddSurveyAnswerRequest } from '@compatibility/compatibility-rpc/interfaces'

import { IsUUID }                      from 'class-validator'
import { IsInt }                       from 'class-validator'

export class AddSurveyAnswerPayload {
  constructor(private readonly request: AddSurveyAnswerRequest) {}

  @IsUUID(4)
  get surveyId(): string {
    return this.request.surveyId
  }

  @IsUUID(4)
  get questionId(): string {
    return this.request.questionId
  }

  @IsInt()
  get answer(): number {
    return this.request.answer
  }
}

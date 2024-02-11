import type { Survey } from '@compatibility/domain-module'

import { Timestamp }   from '@bufbuild/protobuf'

import * as rpc        from '@compatibility/compatibility-rpc/abstractions'

export class SurveySerializer extends rpc.Survey {
  constructor(private readonly survey: Survey) {
    super()
  }

  get id(): string {
    return this.survey.id
  }

  get status(): rpc.SurveyStatus {
    return this.survey.status
  }

  get intervieweeId(): string {
    return this.survey.intervieweeId
  }

  get questionaireId(): string {
    return this.survey.questionaireId
  }

  get answers(): Record<string, number> {
    return this.survey.answers as Record<string, number>
  }

  get createdAt(): Timestamp {
    return Timestamp.fromDate(this.survey.createdAt)
  }
}

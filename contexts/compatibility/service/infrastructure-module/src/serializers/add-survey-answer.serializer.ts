import type { Survey }             from '@compatibility/domain-module'

import { AddSurveyAnswerResponse } from '@compatibility/compatibility-rpc/abstractions'

import { SurveySerializer }        from './survey.serializer.js'

export class AddSurveyAnswerSerializer extends AddSurveyAnswerResponse {
  constructor(private readonly survey: Survey) {
    super()
  }

  get result(): SurveySerializer {
    return new SurveySerializer(this.survey)
  }
}

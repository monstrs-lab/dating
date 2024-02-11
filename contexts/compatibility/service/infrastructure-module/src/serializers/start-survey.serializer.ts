import type { Survey }         from '@compatibility/domain-module'

import { StartSurveyResponse } from '@compatibility/compatibility-rpc/abstractions'

import { SurveySerializer }    from './survey.serializer.js'

export class StartSurveySerializer extends StartSurveyResponse {
  constructor(private readonly survey: Survey) {
    super()
  }

  get result(): SurveySerializer {
    return new SurveySerializer(this.survey)
  }
}

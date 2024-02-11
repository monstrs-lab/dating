import type { Survey }         from '@compatibility/domain-module'

import { ListSurveysResponse } from '@compatibility/compatibility-rpc/abstractions'

import { SurveySerializer }    from './survey.serializer.js'

export class ListSurveysSerializer extends ListSurveysResponse {
  constructor(private readonly query: { surveys: Array<Survey>; hasNextPage: boolean }) {
    super()
  }

  get surveys(): Array<SurveySerializer> {
    return this.query.surveys.map((survey) => new SurveySerializer(survey))
  }

  get hasNextPage(): boolean {
    return this.query.hasNextPage
  }
}

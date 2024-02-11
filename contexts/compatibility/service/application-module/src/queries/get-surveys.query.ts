import type { FindSurveysByQuery } from '../repositories/index.js'

export class GetSurveysQuery {
  constructor(
    public readonly pager: FindSurveysByQuery['pager'],
    public readonly order?: FindSurveysByQuery['order'],
    public readonly query?: FindSurveysByQuery['query'],
    public readonly search?: FindSurveysByQuery['search']
  ) {}
}

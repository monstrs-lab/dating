import type { IQueryHandler }            from '@nestjs/cqrs'

import type { FindSurveysByQueryResult } from '../repositories/index.js'

import { QueryHandler }                  from '@nestjs/cqrs'

import { GetSurveysQuery }               from '../queries/index.js'
import { SurveyRepository }              from '../repositories/index.js'

@QueryHandler(GetSurveysQuery)
export class GetSurveysQueryHandler implements IQueryHandler<GetSurveysQuery> {
  constructor(private readonly surveyRepository: SurveyRepository) {}

  async execute({
    pager,
    order,
    query,
    search,
  }: GetSurveysQuery): Promise<FindSurveysByQueryResult> {
    return this.surveyRepository.findByQuery({
      pager,
      order,
      query,
      search,
    })
  }
}

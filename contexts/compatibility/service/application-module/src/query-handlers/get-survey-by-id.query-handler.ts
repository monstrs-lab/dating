import type { Survey }        from '@compatibility/domain-module'
import type { IQueryHandler } from '@nestjs/cqrs'

import { QueryHandler }       from '@nestjs/cqrs'

import { GetSurveyByIdQuery } from '../queries/index.js'
import { SurveyRepository }   from '../repositories/index.js'

@QueryHandler(GetSurveyByIdQuery)
export class GetSurveyQueryHandler implements IQueryHandler<GetSurveyByIdQuery> {
  constructor(private readonly surveyRepository: SurveyRepository) {}

  async execute(query: GetSurveyByIdQuery): Promise<Survey | undefined> {
    return this.surveyRepository.findById(query.surveyId)
  }
}

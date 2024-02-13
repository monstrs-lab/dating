import type { Survey } from '@compatibility/domain-module'
import type { Query }  from '@monstrs/query-types'

export interface SurveysQuery {
  id?: Query.IDType
  status?: Query.NumberType
  intervieweeId?: Query.IDType
  questionaireId?: Query.IDType
}

export interface FindSurveysByQuery {
  pager?: Query.Pager
  order?: Query.Order
  search?: Query.Search
  query?: SurveysQuery
}

export interface FindSurveysByQueryResult {
  surveys: Array<Survey>
  hasNextPage: boolean
}

export abstract class SurveyRepository {
  abstract save(aggregate: Survey): Promise<void>

  abstract findById(id: string): Promise<Survey | undefined>

  abstract findByQuery(query: FindSurveysByQuery): Promise<FindSurveysByQueryResult>
}

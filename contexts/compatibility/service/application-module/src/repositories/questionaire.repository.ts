import type { Questionaire } from '@compatibility/domain-module'
import type { Query }        from '@monstrs/query-types'

export interface QuestionairesQuery {
  id?: Query.IDType
  status?: Query.NumberType
}

export interface FindQuestionairesByQuery {
  pager?: Query.Pager
  order?: Query.Order
  search?: Query.Search
  query?: QuestionairesQuery
}

export interface FindQuestionairesByQueryResult {
  questionaires: Array<Questionaire>
  hasNextPage: boolean
}

export abstract class QuestionaireRepository {
  abstract save(aggregate: Questionaire): Promise<void>

  abstract findById(id: string): Promise<Questionaire | undefined>

  abstract findByQuery(query: FindQuestionairesByQuery): Promise<FindQuestionairesByQueryResult>
}

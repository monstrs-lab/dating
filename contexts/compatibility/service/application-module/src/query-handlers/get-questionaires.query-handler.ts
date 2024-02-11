import type { IQueryHandler }                  from '@nestjs/cqrs'

import type { FindQuestionairesByQueryResult } from '../repositories/index.js'

import { QueryHandler }                        from '@nestjs/cqrs'

import { GetQuestionairesQuery }               from '../queries/index.js'
import { QuestionaireRepository }              from '../repositories/index.js'

@QueryHandler(GetQuestionairesQuery)
export class GetQuestionairesQueryHandler implements IQueryHandler<GetQuestionairesQuery> {
  constructor(private readonly questionaireRepository: QuestionaireRepository) {}

  async execute({
    pager,
    order,
    query,
    search,
  }: GetQuestionairesQuery): Promise<FindQuestionairesByQueryResult> {
    return this.questionaireRepository.findByQuery({
      pager,
      order,
      query,
      search,
    })
  }
}

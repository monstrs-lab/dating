import type { Questionaire }        from '@compatibility/domain-module'
import type { IQueryHandler }       from '@nestjs/cqrs'

import { QueryHandler }             from '@nestjs/cqrs'

import { GetQuestionaireByIdQuery } from '../queries/index.js'
import { QuestionaireRepository }   from '../repositories/index.js'

@QueryHandler(GetQuestionaireByIdQuery)
export class GetQuestionaireQueryHandler implements IQueryHandler<GetQuestionaireByIdQuery> {
  constructor(private readonly questionaireRepository: QuestionaireRepository) {}

  async execute(query: GetQuestionaireByIdQuery): Promise<Questionaire | undefined> {
    return this.questionaireRepository.findById(query.questionaireId)
  }
}

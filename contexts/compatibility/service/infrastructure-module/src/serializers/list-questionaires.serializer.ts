import type { Questionaire }         from '@compatibility/domain-module'

import { ListQuestionairesResponse } from '@compatibility/compatibility-rpc/abstractions'

import { QuestionaireSerializer }    from './questionaire.serializer.js'

export class ListQuestionairesSerializer extends ListQuestionairesResponse {
  constructor(
    private readonly query: { questionaires: Array<Questionaire>; hasNextPage: boolean }
  ) {
    super()
  }

  get questionaires(): Array<QuestionaireSerializer> {
    return this.query.questionaires.map((questionaire) => new QuestionaireSerializer(questionaire))
  }

  get hasNextPage(): boolean {
    return this.query.hasNextPage
  }
}

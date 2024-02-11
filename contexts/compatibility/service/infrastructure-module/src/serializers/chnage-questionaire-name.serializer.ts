import type { Questionaire }              from '@compatibility/domain-module'

import { ChangeQuestionaireNameResponse } from '@compatibility/compatibility-rpc/abstractions'

import { QuestionaireSerializer }         from './questionaire.serializer.js'

export class ChangeQuestionaireNameSerializer extends ChangeQuestionaireNameResponse {
  constructor(private readonly questionaire: Questionaire) {
    super()
  }

  get result(): QuestionaireSerializer {
    return new QuestionaireSerializer(this.questionaire)
  }
}

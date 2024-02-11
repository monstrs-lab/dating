import type { Questionaire }               from '@compatibility/domain-module'

import { AddQuestionaireQuestionResponse } from '@compatibility/compatibility-rpc/abstractions'

import { QuestionaireSerializer }          from './questionaire.serializer.js'

export class AddQuestionaireQuestionSerializer extends AddQuestionaireQuestionResponse {
  constructor(private readonly questionaire: Questionaire) {
    super()
  }

  get result(): QuestionaireSerializer {
    return new QuestionaireSerializer(this.questionaire)
  }
}

import type { Questionaire }                  from '@compatibility/domain-module'

import { ChangeQuestionaireQuestionResponse } from '@compatibility/compatibility-rpc/abstractions'

import { QuestionaireSerializer }             from './questionaire.serializer.js'

export class ChangeQuestionaireQuestionSerializer extends ChangeQuestionaireQuestionResponse {
  constructor(private readonly questionaire: Questionaire) {
    super()
  }

  get result(): QuestionaireSerializer {
    return new QuestionaireSerializer(this.questionaire)
  }
}

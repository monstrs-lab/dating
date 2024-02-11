import type { Questionaire }                  from '@compatibility/domain-module'

import { DeleteQuestionaireQuestionResponse } from '@compatibility/compatibility-rpc/abstractions'

import { QuestionaireSerializer }             from './questionaire.serializer.js'

export class DeleteQuestionaireQuestionSerializer extends DeleteQuestionaireQuestionResponse {
  constructor(private readonly questionaire: Questionaire) {
    super()
  }

  get result(): QuestionaireSerializer {
    return new QuestionaireSerializer(this.questionaire)
  }
}

import type { Questionaire }            from '@compatibility/domain-module'

import { ActivateQuestionaireResponse } from '@compatibility/compatibility-rpc/abstractions'

import { QuestionaireSerializer }       from './questionaire.serializer.js'

export class ActivateQuestionaireSerializer extends ActivateQuestionaireResponse {
  constructor(private readonly questionaire: Questionaire) {
    super()
  }

  get result(): QuestionaireSerializer {
    return new QuestionaireSerializer(this.questionaire)
  }
}

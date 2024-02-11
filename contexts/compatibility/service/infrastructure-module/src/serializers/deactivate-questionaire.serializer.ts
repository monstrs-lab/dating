import type { Questionaire }              from '@compatibility/domain-module'

import { DeactivateQuestionaireResponse } from '@compatibility/compatibility-rpc/abstractions'

import { QuestionaireSerializer }         from './questionaire.serializer.js'

export class DeactivateQuestionaireSerializer extends DeactivateQuestionaireResponse {
  constructor(private readonly questionaire: Questionaire) {
    super()
  }

  get result(): QuestionaireSerializer {
    return new QuestionaireSerializer(this.questionaire)
  }
}

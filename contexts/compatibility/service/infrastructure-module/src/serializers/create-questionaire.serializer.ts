import type { Questionaire }          from '@compatibility/domain-module'

import { CreateQuestionaireResponse } from '@compatibility/compatibility-rpc/abstractions'

import { QuestionaireSerializer }     from './questionaire.serializer.js'

export class CreateQuestionaireSerializer extends CreateQuestionaireResponse {
  constructor(private readonly questionaire: Questionaire) {
    super()
  }

  get result(): QuestionaireSerializer {
    return new QuestionaireSerializer(this.questionaire)
  }
}

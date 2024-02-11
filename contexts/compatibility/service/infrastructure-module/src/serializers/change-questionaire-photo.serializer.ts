import type { Questionaire }               from '@compatibility/domain-module'

import { ChangeQuestionairePhotoResponse } from '@compatibility/compatibility-rpc/abstractions'

import { QuestionaireSerializer }          from './questionaire.serializer.js'

export class ChangeQuestionairePhotoSerializer extends ChangeQuestionairePhotoResponse {
  constructor(private readonly questionaire: Questionaire) {
    super()
  }

  get result(): QuestionaireSerializer {
    return new QuestionaireSerializer(this.questionaire)
  }
}

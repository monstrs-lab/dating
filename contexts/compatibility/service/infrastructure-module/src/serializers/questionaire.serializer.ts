import type { Questionaire } from '@compatibility/domain-module'

import { Timestamp }         from '@bufbuild/protobuf'

import * as rpc              from '@compatibility/compatibility-rpc/abstractions'

export class QuestionaireSerializer extends rpc.Questionaire {
  constructor(private readonly questionaire: Questionaire) {
    super()
  }

  get id(): string {
    return this.questionaire.id
  }

  get status(): rpc.QuestionaireStatus {
    return this.questionaire.status
  }

  get name(): string {
    return this.questionaire.name
  }

  get photoId(): string | undefined {
    return this.questionaire.photoId
  }

  get questions(): Array<rpc.Question> {
    return this.questionaire.questions
  }

  get createdAt(): Timestamp {
    return Timestamp.fromDate(this.questionaire.createdAt)
  }
}

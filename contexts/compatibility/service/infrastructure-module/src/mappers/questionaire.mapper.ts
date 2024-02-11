/* eslint-disable no-param-reassign */

import type { ExtractProperties }  from '@monstrs/base-types'

import type { QuestionaireEntity } from '../entities/index.js'

import { Injectable }              from '@nestjs/common'

import { Questionaire }            from '@compatibility/domain-module'
import { Question }                from '@compatibility/domain-module'

@Injectable()
export class QuestionaireMapper {
  toDomain(entity: QuestionaireEntity): Questionaire {
    const questionaireProperties: Omit<ExtractProperties<Questionaire>, 'autoCommit'> = {
      id: entity.id,
      status: entity.status,
      name: entity.name,
      photoId: entity.photoId,
      questions: entity.questions.map((question) => Object.assign(new Question(), question)),
      createdAt: entity.createdAt,
    }

    return Object.assign(new Questionaire(), questionaireProperties)
  }

  toPersistence(aggregate: Questionaire, entity: QuestionaireEntity): QuestionaireEntity {
    entity.id = aggregate.id
    entity.status = aggregate.status
    entity.name = aggregate.name
    entity.photoId = aggregate.photoId
    entity.questions = aggregate.questions.map((question) => ({
      id: question.id,
      content: question.content,
    }))
    entity.createdAt = aggregate.createdAt

    return entity
  }
}

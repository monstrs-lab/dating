/* eslint-disable no-param-reassign */

import type { ExtractProperties } from '@monstrs/base-types'

import type { SurveyEntity }      from '../entities/index.js'

import { Injectable }             from '@nestjs/common'

import { Survey }                 from '@compatibility/domain-module'

@Injectable()
export class SurveyMapper {
  toDomain(entity: SurveyEntity): Survey {
    const surveyProperties: Omit<ExtractProperties<Survey>, 'autoCommit'> = {
      id: entity.id,
      status: entity.status,
      intervieweeId: entity.intervieweeId,
      questionaireId: entity.questionaireId,
      answers: entity.answers,
      createdAt: entity.createdAt,
    }

    return Object.assign(new Survey(), surveyProperties)
  }

  toPersistence(aggregate: Survey, entity: SurveyEntity): SurveyEntity {
    entity.id = aggregate.id
    entity.status = aggregate.status
    entity.intervieweeId = aggregate.intervieweeId
    entity.questionaireId = aggregate.questionaireId
    entity.answers = aggregate.answers
    entity.createdAt = aggregate.createdAt

    return entity
  }
}

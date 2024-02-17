/* eslint-disable no-param-reassign */

import type { ExtractProperties } from '@monstrs/base-types'

import type { ProfileEntity }     from '../entities/index.js'
import type { SimilarityEntity }  from '../entities/index.js'

import { Injectable }             from '@nestjs/common'

import { Similarity }             from '@profiles/domain-module'

@Injectable()
export class SimilarityMapper {
  toDomain(entity: SimilarityEntity): Similarity {
    const properties: Omit<ExtractProperties<Similarity>, 'autoCommit'> = {
      id: entity.id,
      compatibilityId: entity.compatibilityId,
      fromId: entity.from.id,
      toId: entity.to.id,
      value: entity.value,
      createdAt: entity.createdAt,
    }

    return Object.assign(new Similarity(), properties)
  }

  toPersistence(aggregate: Similarity, entity: SimilarityEntity): SimilarityEntity {
    entity.id = aggregate.id
    entity.compatibilityId = aggregate.compatibilityId
    entity.from = {
      id: aggregate.fromId,
    } as ProfileEntity
    entity.to = {
      id: aggregate.toId,
    } as ProfileEntity
    entity.value = aggregate.value
    entity.createdAt = aggregate.createdAt

    return entity
  }
}

/* eslint-disable no-param-reassign */

import type { ExtractProperties } from '@monstrs/base-types'

import type { ProfileEntity }     from '../entities/index.js'
import type { SkipEntity }        from '../entities/index.js'

import { Injectable }             from '@nestjs/common'

import { Skip }                   from '@profiles/domain-module'

@Injectable()
export class SkipMapper {
  toDomain(entity: SkipEntity): Skip {
    const properties: Omit<ExtractProperties<Skip>, 'autoCommit'> = {
      id: entity.id,
      profileId: entity.profile.id,
      targetId: entity.target.id,
      createdAt: entity.createdAt,
    }

    return Object.assign(new Skip(), properties)
  }

  toPersistence(aggregate: Skip, entity: SkipEntity): SkipEntity {
    entity.id = aggregate.id
    entity.profile = {
      id: aggregate.profileId,
    } as ProfileEntity
    entity.target = {
      id: aggregate.targetId,
    } as ProfileEntity
    entity.createdAt = aggregate.createdAt

    return entity
  }
}

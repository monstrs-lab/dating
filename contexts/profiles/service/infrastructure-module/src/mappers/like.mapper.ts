/* eslint-disable no-param-reassign */

import type { ExtractProperties } from '@monstrs/base-types'

import type { ProfileEntity }     from '../entities/index.js'
import type { LikeEntity }        from '../entities/index.js'

import { Injectable }             from '@nestjs/common'

import { Like }                   from '@profiles/domain-module'

@Injectable()
export class LikeMapper {
  toDomain(entity: LikeEntity): Like {
    const properties: Omit<ExtractProperties<Like>, 'autoCommit'> = {
      id: entity.id,
      profileId: entity.profile.id,
      targetId: entity.target.id,
      createdAt: entity.createdAt,
    }

    return Object.assign(new Like(), properties)
  }

  toPersistence(aggregate: Like, entity: LikeEntity): LikeEntity {
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

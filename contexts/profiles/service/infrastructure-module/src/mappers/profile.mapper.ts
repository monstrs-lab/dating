/* eslint-disable no-param-reassign */

import type { ExtractProperties } from '@monstrs/base-types'

import type { ProfileEntity }     from '../entities/index.js'

import { Injectable }             from '@nestjs/common'

import { Profile }                from '@profiles/domain-module'

@Injectable()
export class ProfileMapper {
  toDomain(entity: ProfileEntity): Profile {
    const profileProperties: Omit<ExtractProperties<Profile>, 'autoCommit'> = {
      id: entity.id,
      gender: entity.gender,
      name: entity.name,
      createdAt: entity.createdAt,
    }

    return Object.assign(new Profile(), profileProperties)
  }

  toPersistence(aggregate: Profile, entity: ProfileEntity): ProfileEntity {
    entity.id = aggregate.id
    entity.gender = aggregate.gender
    entity.name = aggregate.name
    entity.createdAt = aggregate.createdAt

    return entity
  }
}

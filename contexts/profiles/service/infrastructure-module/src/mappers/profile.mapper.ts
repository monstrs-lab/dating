/* eslint-disable no-param-reassign */

import type { ExtractProperties } from '@monstrs/base-types'

import type { ProfileEntity }     from '../entities/index.js'

import { Injectable }             from '@nestjs/common'

import { Profile }                from '@profiles/domain-module'
import { ProfileGeoposition }     from '@profiles/domain-module'

@Injectable()
export class ProfileMapper {
  toDomain(entity: ProfileEntity): Profile {
    const profileGeopositionProperties: ExtractProperties<ProfileGeoposition> | undefined =
      entity.geoposition
        ? {
            latitude: entity.geoposition.latitude,
            longitude: entity.geoposition.longitude,
          }
        : undefined

    const profileProperties: Omit<ExtractProperties<Profile>, 'autoCommit'> = {
      id: entity.id,
      gender: entity.gender,
      name: entity.name,
      location: entity.location,
      geoposition: profileGeopositionProperties
        ? Object.assign(new ProfileGeoposition(), profileGeopositionProperties)
        : undefined,
      createdAt: entity.createdAt,
    }

    return Object.assign(new Profile(), profileProperties)
  }

  toPersistence(aggregate: Profile, entity: ProfileEntity): ProfileEntity {
    entity.id = aggregate.id
    entity.gender = aggregate.gender
    entity.name = aggregate.name
    entity.location = aggregate.location

    if (aggregate.geoposition) {
      entity.geoposition = {
        latitude: aggregate.geoposition.latitude,
        longitude: aggregate.geoposition.longitude,
      }
    }

    entity.createdAt = aggregate.createdAt

    return entity
  }
}

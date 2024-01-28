import type { Profile }                   from '@profiles/domain-module'

import { FillProfileGeopositionResponse } from '@profiles/profiles-rpc/abstractions'

import { ProfileSerializer }              from './profile.serializer.js'

export class FillProfileGeopositionSerializer extends FillProfileGeopositionResponse {
  constructor(private readonly profile: Profile) {
    super()
  }

  get result(): ProfileSerializer {
    return new ProfileSerializer(this.profile)
  }
}

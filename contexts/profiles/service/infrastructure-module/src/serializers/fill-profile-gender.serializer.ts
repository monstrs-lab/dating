import type { Profile }              from '@profiles/domain-module'

import { FillProfileGenderResponse } from '@profiles/profiles-rpc/abstractions'

import { ProfileSerializer }         from './profile.serializer.js'

export class FillProfileGenderSerializer extends FillProfileGenderResponse {
  constructor(private readonly profile: Profile) {
    super()
  }

  get result(): ProfileSerializer {
    return new ProfileSerializer(this.profile)
  }
}

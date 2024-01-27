import type { Profile }                from '@profiles/domain-module'

import { SelectProfileGenderResponse } from '@profiles/profiles-rpc/abstractions'

import { ProfileSerializer }           from './profile.serializer.js'

export class SelectProfileGenderSerializer extends SelectProfileGenderResponse {
  constructor(private readonly profile: Profile) {
    super()
  }

  get result(): ProfileSerializer {
    return new ProfileSerializer(this.profile)
  }
}

import type { Profile }        from '@profiles/domain-module'

import { SkipProfileResponse } from '@profiles/profiles-rpc/abstractions'

import { ProfileSerializer }   from './profile.serializer.js'

export class SkipProfileSerializer extends SkipProfileResponse {
  constructor(private readonly profile: Profile) {
    super()
  }

  get result(): ProfileSerializer {
    return new ProfileSerializer(this.profile)
  }
}

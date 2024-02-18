import type { Profile }        from '@profiles/domain-module'

import { LikeProfileResponse } from '@profiles/profiles-rpc/abstractions'

import { ProfileSerializer }   from './profile.serializer.js'

export class LikeProfileSerializer extends LikeProfileResponse {
  constructor(private readonly profile: Profile) {
    super()
  }

  get result(): ProfileSerializer {
    return new ProfileSerializer(this.profile)
  }
}

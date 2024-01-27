import type { Profile }              from '@profiles/domain-module'

import { ChangeProfileNameResponse } from '@profiles/profiles-rpc/abstractions'

import { ProfileSerializer }         from './profile.serializer.js'

export class ChangeProfileNameSerializer extends ChangeProfileNameResponse {
  constructor(private readonly profile: Profile) {
    super()
  }

  get result(): ProfileSerializer {
    return new ProfileSerializer(this.profile)
  }
}

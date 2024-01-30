import type { Profile }            from '@profiles/domain-module'

import { AddProfilePhotoResponse } from '@profiles/profiles-rpc/abstractions'

import { ProfileSerializer }       from './profile.serializer.js'

export class AddProfilePhotoSerializer extends AddProfilePhotoResponse {
  constructor(private readonly profile: Profile) {
    super()
  }

  get result(): ProfileSerializer {
    return new ProfileSerializer(this.profile)
  }
}

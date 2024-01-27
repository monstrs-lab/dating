import type { Profile }         from '@profiles/domain-module'

import { ListProfilesResponse } from '@profiles/profiles-rpc/abstractions'

import { ProfileSerializer }    from './profile.serializer.js'

export class ListProfilesSerializer extends ListProfilesResponse {
  constructor(private readonly query: { profiles: Array<Profile>; hasNextPage: boolean }) {
    super()
  }

  get profiles(): Array<ProfileSerializer> {
    return this.query.profiles.map((profile) => new ProfileSerializer(profile))
  }

  get hasNextPage(): boolean {
    return this.query.hasNextPage
  }
}

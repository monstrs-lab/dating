import type { Profile } from '@profiles/domain-module'

import { Timestamp }    from '@bufbuild/protobuf'

import * as rpc         from '@profiles/profiles-rpc/abstractions'

export class ProfileSerializer extends rpc.Profile {
  constructor(private readonly profile: Profile) {
    super()
  }

  get id(): string {
    return this.profile.id
  }

  get gender(): rpc.ProfileGender | undefined {
    return this.profile.gender
  }

  get name(): string | undefined {
    return this.profile.name
  }

  get location(): string | undefined {
    return this.profile.location
  }

  get geoposition(): rpc.ProfileGeoposition | undefined {
    return this.profile.geoposition
  }

  get photos(): Array<string> {
    return this.profile.photos || []
  }

  get createdAt(): Timestamp {
    return Timestamp.fromDate(this.profile.createdAt)
  }
}

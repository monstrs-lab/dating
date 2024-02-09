import type { Profile }   from '@profiles/client-module'

import { ResolveField }   from '@nestjs/graphql'
import { Resolver }       from '@nestjs/graphql'

import { ProfilesClient } from '@profiles/client-module'

import { MyMatches }      from '../types/index.js'

@Resolver(() => MyMatches)
export class MyMatchesResolver {
  constructor(private readonly profilesClient: ProfilesClient) {}

  @ResolveField()
  async profiles(): Promise<Array<Profile>> {
    const { profiles } = await this.profilesClient.listProfiles()

    return profiles
  }
}

import type { Profile }   from '@profiles/client-module'

import { ResolveField }   from '@nestjs/graphql'
import { Resolver }       from '@nestjs/graphql'
import { Context }        from '@nestjs/graphql'

import { ProfilesClient } from '@profiles/client-module'

import { MyProfile }      from '../types/index.js'

@Resolver(() => MyProfile)
export class MyProfileResolver {
  constructor(private readonly profilesClient: ProfilesClient) {}

  @ResolveField()
  async info(@Context('user') profileId: string): Promise<Profile> {
    return this.profilesClient.loadProfile(profileId)
  }
}

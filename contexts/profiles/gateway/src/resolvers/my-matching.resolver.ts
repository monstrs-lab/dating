import type { GetMatchesResponse } from '@profiles/client-module'

import { ResolveField }            from '@nestjs/graphql'
import { Resolver }                from '@nestjs/graphql'
import { Context }                 from '@nestjs/graphql'

import { ProfilesClient }          from '@profiles/client-module'

import { MyMatching }              from '../types/index.js'

@Resolver(() => MyMatching)
export class MyMatchingResolver {
  constructor(private readonly profilesClient: ProfilesClient) {}

  @ResolveField()
  async matches(@Context('user') profileId: string): Promise<GetMatchesResponse> {
    return this.profilesClient.getMatches(profileId)
  }
}

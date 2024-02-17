/* eslint-disable @typescript-eslint/consistent-type-imports */

import type { PromiseClient }        from '@connectrpc/connect'
import type { ListProfilesRequest }  from '@profiles/profiles-rpc'
import type { ListProfilesResponse } from '@profiles/profiles-rpc'
import type { ProfileGender }        from '@profiles/profiles-rpc'
import type { ProfilesService }      from '@profiles/profiles-rpc'
import type { Profile }              from '@profiles/profiles-rpc'

import { Inject }                    from '@nestjs/common'
import { Injectable }                from '@nestjs/common'

import { PROFILES_CLIENT_TOKEN }     from '../constants/index.js'
import { ProfilesDataLoader }        from '../dataloaders/index.js'

@Injectable()
export class ProfilesClient {
  constructor(
    @Inject(PROFILES_CLIENT_TOKEN) protected readonly client: PromiseClient<typeof ProfilesService>,
    private readonly profilesDataLoader: ProfilesDataLoader
  ) {}

  async fillProfileGender(profileId: string, gender: ProfileGender): Promise<{ result?: Profile }> {
    return this.client.fillProfileGender({
      profileId,
      gender,
    })
  }

  async fillProfileName(profileId: string, name: string): Promise<{ result?: Profile }> {
    return this.client.fillProfileName({
      profileId,
      name,
    })
  }

  async fillProfileGeoposition(
    profileId: string,
    latitude: number,
    longitude: number
  ): Promise<{ result?: Profile }> {
    return this.client.fillProfileGeoposition({
      profileId,
      latitude,
      longitude,
    })
  }

  async skipProfile(profileId: string, targetId: string): Promise<{ result?: Profile }> {
    return this.client.skipProfile({
      profileId,
      targetId,
    })
  }

  async addProfilePhoto(profileId: string, photoId: string): Promise<{ result?: Profile }> {
    return this.client.addProfilePhoto({
      profileId,
      photoId,
    })
  }

  async listProfiles(request: Partial<ListProfilesRequest> = {}): Promise<ListProfilesResponse> {
    return this.client.listProfiles(request)
  }

  async loadProfile(profileId: string): Promise<Profile> {
    return this.profilesDataLoader.load(profileId)
  }

  async loadProfiles(profileIds: Array<string>): Promise<Array<Error | Profile>> {
    return this.profilesDataLoader.loadMany(profileIds)
  }
}

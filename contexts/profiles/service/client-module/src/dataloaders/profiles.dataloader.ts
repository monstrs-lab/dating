/* eslint-disable @typescript-eslint/consistent-type-imports */

import type { PromiseClient }    from '@connectrpc/connect'
import type { Profile }          from '@profiles/profiles-rpc'
import type { ProfilesService }  from '@profiles/profiles-rpc'

import { Injectable }            from '@nestjs/common'
import { Inject }                from '@nestjs/common'
import DataLoader                from 'dataloader'

import { PROFILES_CLIENT_TOKEN } from '../constants/index.js'

@Injectable()
export class ProfilesDataLoader {
  protected dataloader: DataLoader<string, Profile>

  constructor(
    @Inject(PROFILES_CLIENT_TOKEN) protected readonly client: PromiseClient<typeof ProfilesService>
  ) {
    this.dataloader = new DataLoader<string, Profile>(async (queries) => this.getProfiles(queries))
  }

  async load(query: string): Promise<Profile> {
    return this.dataloader.load(query)
  }

  async loadMany(queries: Array<string>): Promise<Array<Error | Profile>> {
    return this.dataloader.loadMany(queries)
  }

  protected async getProfiles(profileIds: ReadonlyArray<string>): Promise<Array<Profile>> {
    const { profiles } = await this.client.listProfiles({
      query: {
        id: {
          conditions: {
            in: {
              values: profileIds.map((profileId) => profileId),
            },
          },
        },
      },
    })

    return profiles
  }
}

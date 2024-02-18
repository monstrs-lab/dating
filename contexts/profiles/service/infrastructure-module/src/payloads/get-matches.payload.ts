import type { GetMatchesRequest } from '@profiles/profiles-rpc/interfaces'

import { IsUUID }                 from 'class-validator'

export class GetMatchesPayload {
  constructor(private readonly request: GetMatchesRequest) {}

  @IsUUID('4')
  get profileId(): string {
    return this.request.profileId
  }
}

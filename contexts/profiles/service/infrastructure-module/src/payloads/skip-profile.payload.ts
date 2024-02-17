import type { SkipProfileRequest } from '@profiles/profiles-rpc/interfaces'

import { IsUUID }                  from 'class-validator'

export class SkipProfilePayload {
  constructor(private readonly request: SkipProfileRequest) {}

  @IsUUID('4')
  get profileId(): string {
    return this.request.profileId
  }

  @IsUUID('4')
  get targetId(): string {
    return this.request.targetId
  }
}

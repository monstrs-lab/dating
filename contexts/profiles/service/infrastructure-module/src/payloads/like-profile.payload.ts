import type { LikeProfileRequest } from '@profiles/profiles-rpc/interfaces'

import { IsUUID }                  from 'class-validator'

export class LikeProfilePayload {
  constructor(private readonly request: LikeProfileRequest) {}

  @IsUUID('4')
  get profileId(): string {
    return this.request.profileId
  }

  @IsUUID('4')
  get targetId(): string {
    return this.request.targetId
  }
}

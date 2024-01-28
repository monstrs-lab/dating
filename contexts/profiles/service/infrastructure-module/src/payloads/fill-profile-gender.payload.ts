import type { FillProfileGenderRequest } from '@profiles/profiles-rpc/interfaces'

import { IsEnum }                        from 'class-validator'
import { IsUUID }                        from 'class-validator'

import { ProfileGender }                 from '@profiles/profiles-rpc/interfaces'

export class FillProfileGenderPayload {
  constructor(private readonly request: FillProfileGenderRequest) {}

  @IsUUID('4')
  get profileId(): string {
    return this.request.profileId
  }

  @IsEnum(ProfileGender)
  get gender(): ProfileGender {
    return this.request.gender
  }
}

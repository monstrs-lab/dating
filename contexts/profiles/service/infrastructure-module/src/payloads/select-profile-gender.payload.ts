import type { SelectProfileGenderRequest } from '@profiles/profiles-rpc/interfaces'

import { IsEnum }                          from 'class-validator'
import { IsUUID }                          from 'class-validator'

import { ProfileGender }                   from '@profiles/profiles-rpc/interfaces'

export class SelectProfileGenderPayload {
  constructor(private readonly request: SelectProfileGenderRequest) {}

  @IsUUID('4')
  get profileId(): string {
    return this.request.profileId
  }

  @IsEnum(ProfileGender)
  get gender(): ProfileGender {
    return this.request.gender
  }
}

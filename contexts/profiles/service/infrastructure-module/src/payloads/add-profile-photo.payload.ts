import type { AddProfilePhotoRequest } from '@profiles/profiles-rpc/interfaces'

import { IsUUID }                      from 'class-validator'

export class AddProfilePhotoPayload {
  constructor(private readonly request: AddProfilePhotoRequest) {}

  @IsUUID('4')
  get profileId(): string {
    return this.request.profileId
  }

  @IsUUID('4')
  get photoId(): string {
    return this.request.photoId
  }
}

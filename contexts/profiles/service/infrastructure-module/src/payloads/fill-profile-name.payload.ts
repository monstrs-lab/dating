import type { FillProfileNameRequest } from '@profiles/profiles-rpc/interfaces'

import { IsNotEmpty }                  from 'class-validator'
import { IsUUID }                      from 'class-validator'

export class FillProfileNamePayload {
  constructor(private readonly request: FillProfileNameRequest) {}

  @IsUUID('4')
  get profileId(): string {
    return this.request.profileId
  }

  @IsNotEmpty()
  get name(): string {
    return this.request.name
  }
}

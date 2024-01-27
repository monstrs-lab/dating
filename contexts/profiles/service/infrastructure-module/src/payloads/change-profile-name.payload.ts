import type { ChangeProfileNameRequest } from '@profiles/profiles-rpc/interfaces'

import { IsNotEmpty }                    from 'class-validator'
import { IsUUID }                        from 'class-validator'

export class ChangeProfileNamePayload {
  constructor(private readonly request: ChangeProfileNameRequest) {}

  @IsUUID('4')
  get profileId(): string {
    return this.request.profileId
  }

  @IsNotEmpty()
  get name(): string {
    return this.request.name
  }
}

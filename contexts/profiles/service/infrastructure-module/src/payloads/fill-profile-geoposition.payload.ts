import type { FillProfileGeopositionRequest } from '@profiles/profiles-rpc/interfaces'

import { IsNumber }                           from 'class-validator'
import { IsUUID }                             from 'class-validator'

export class FillProfileGeopositionPayload {
  constructor(private readonly request: FillProfileGeopositionRequest) {}

  @IsUUID('4')
  get profileId(): string {
    return this.request.profileId
  }

  @IsNumber()
  get latitude(): number {
    return this.request.latitude
  }

  @IsNumber()
  get longitude(): number {
    return this.request.longitude
  }
}

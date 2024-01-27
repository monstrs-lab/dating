import type { ProfileGender } from '@profiles/domain-module'

export class SelectProfileGenderCommand {
  constructor(
    public readonly profileId: string,
    public readonly gender: ProfileGender
  ) {}
}

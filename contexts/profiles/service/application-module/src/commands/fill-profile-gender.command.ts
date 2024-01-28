import type { ProfileGender } from '@profiles/domain-module'

export class FillProfileGenderCommand {
  constructor(
    public readonly profileId: string,
    public readonly gender: ProfileGender
  ) {}
}

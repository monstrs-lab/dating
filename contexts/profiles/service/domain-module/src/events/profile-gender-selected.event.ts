import type { ProfileGender } from '../enums/index.js'

export class ProfileGenderSelectedEvent {
  constructor(
    public readonly profileId: string,
    public readonly gender: ProfileGender
  ) {}
}

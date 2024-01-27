export class ProfileNameChangedEvent {
  constructor(
    public readonly profileId: string,
    public readonly name: string
  ) {}
}

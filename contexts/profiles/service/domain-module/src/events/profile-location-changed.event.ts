export class ProfileLocationChangedEvent {
  constructor(
    public readonly profileId: string,
    public readonly location: string
  ) {}
}

export class ProfileCreatedEvent {
  constructor(
    public readonly profileId: string,
    public readonly createdAt: Date
  ) {}
}

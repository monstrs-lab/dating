export class SkipCreatedEvent {
  constructor(
    public readonly skipId: string,
    public readonly profileId: string,
    public readonly targetId: string,
    public readonly createdAt: Date
  ) {}
}

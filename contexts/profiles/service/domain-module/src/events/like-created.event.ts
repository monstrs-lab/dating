export class LikeCreatedEvent {
  constructor(
    public readonly likeId: string,
    public readonly profileId: string,
    public readonly targetId: string,
    public readonly createdAt: Date
  ) {}
}

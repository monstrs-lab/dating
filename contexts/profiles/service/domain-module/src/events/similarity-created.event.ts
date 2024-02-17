export class SimilarityCreatedEvent {
  constructor(
    public readonly similarityId: string,
    public readonly compabilityId: string,
    public readonly fromId: string,
    public readonly toId: string,
    public readonly value: number,
    public readonly createdAt: Date
  ) {}
}

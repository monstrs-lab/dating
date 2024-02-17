export class CompatibilityCreatedEvent {
  constructor(
    public readonly compatibilityId: string,
    public readonly questionaireId: string,
    public readonly intervieweeId: string,
    public readonly answers: Record<string, number>,
    public readonly mean: number,
    public readonly createdAt: Date
  ) {}
}

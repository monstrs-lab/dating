export class ProfileGeopositionChangedEvent {
  constructor(
    public readonly profileId: string,
    public readonly latitude: number,
    public readonly longitude: number
  ) {}
}

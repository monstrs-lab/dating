export class ProfilePhotoAddedEvent {
  constructor(
    public readonly profileId: string,
    public readonly photoId: string
  ) {}
}

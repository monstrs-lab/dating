export class AddProfilePhotosCommand {
  constructor(
    public readonly profileId: string,
    public readonly photoId: string
  ) {}
}

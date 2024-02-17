export class SkipProfileCommand {
  constructor(
    public readonly profileId: string,
    public readonly targetId: string
  ) {}
}

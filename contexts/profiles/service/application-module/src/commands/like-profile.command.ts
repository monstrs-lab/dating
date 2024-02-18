export class LikeProfileCommand {
  constructor(
    public readonly profileId: string,
    public readonly targetId: string
  ) {}
}

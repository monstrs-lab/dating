export class ChangeProfileNameCommand {
  constructor(
    public readonly profileId: string,
    public readonly name: string
  ) {}
}

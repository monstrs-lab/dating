export class FillProfileNameCommand {
  constructor(
    public readonly profileId: string,
    public readonly name: string
  ) {}
}

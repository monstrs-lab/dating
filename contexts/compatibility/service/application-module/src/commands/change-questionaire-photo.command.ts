export class ChangeQuestionairePhotoCommand {
  constructor(
    public readonly questionaireId: string,
    public readonly photoId: string
  ) {}
}

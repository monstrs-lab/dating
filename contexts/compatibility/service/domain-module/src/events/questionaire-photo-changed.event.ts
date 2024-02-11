export class QuestionairePhotoChangedEvent {
  constructor(
    public readonly questionaireId: string,
    public readonly photoId: string
  ) {}
}

export class StartSurveyCommand {
  constructor(
    public readonly surveyId: string,
    public readonly intervieweeId: string,
    public readonly questionaireId: string
  ) {}
}

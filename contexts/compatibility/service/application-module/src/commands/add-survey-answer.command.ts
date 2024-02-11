export class AddSurveyAnswerCommand {
  constructor(
    public readonly surveyId: string,
    public readonly questionId: string,
    public readonly answer: number
  ) {}
}

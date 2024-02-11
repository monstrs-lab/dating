import type { SurveyStatus } from '../enums/index.js'

export class SurveyCompletedEvent {
  constructor(
    public readonly surveyId: string,
    public readonly questionaireId: string,
    public readonly intervieweeId: string,
    public readonly answers: Record<string, number>,
    public readonly status: SurveyStatus
  ) {}
}

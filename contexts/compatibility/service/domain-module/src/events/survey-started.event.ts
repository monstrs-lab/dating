import type { SurveyStatus } from '../enums/index.js'

export class SurveyStartedEvent {
  constructor(
    public readonly surveyId: string,
    public readonly questionaireId: string,
    public readonly intervieweeId: string,
    public readonly status: SurveyStatus,
    public readonly answers: Record<string, undefined>,
    public readonly createdAt: Date
  ) {}
}

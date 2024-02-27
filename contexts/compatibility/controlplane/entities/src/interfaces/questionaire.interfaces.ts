export interface Question {
  id: string
  content: string
}

export enum QuestionaireStatus {
  INACTIVE = 0,
  ACTIVE = 1,
}

export interface Questionaire {
  id: string
  createdAt: Date
  name: string
  questionaires: Array<Question>
  status: QuestionaireStatus
}

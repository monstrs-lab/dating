export interface Question {
  id: string
  content: string
}

export type QuestionaireStatus = 'ACTIVE' | 'INACTIVE'

export interface Questionaire {
  id: string
  createdAt: Date
  name: string
  questions: Array<Question>
  status: QuestionaireStatus
}

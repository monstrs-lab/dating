import { Guard }                       from '@monstrs/guard-clause'
import { Against }                     from '@monstrs/guard-clause'
import { AggregateRoot }               from '@nestjs/cqrs'

import { SurveyStatus }                from '../enums/index.js'
import { SurveyAlreadyCompletedError } from '../errors/index.js'
import { SurveyStartedEvent }          from '../events/index.js'
import { SurveyCompletedEvent }        from '../events/index.js'
import { SurveyAnswerAddedEvent }      from '../events/index.js'
import { Questionaire }                from './questionaire.aggregate.js'

export class Survey extends AggregateRoot {
  #id!: string

  #status!: SurveyStatus

  #questionaireId!: string

  #intervieweeId!: string

  #answers: Record<string, number | undefined> = {}

  #createdAt!: Date

  get id(): string {
    return this.#id
  }

  private set id(id: string) {
    this.#id = id
  }

  get status(): SurveyStatus {
    return this.#status
  }

  private set status(status: SurveyStatus) {
    this.#status = status
  }

  get questionaireId(): string {
    return this.#questionaireId
  }

  private set questionaireId(questionaireId: string) {
    this.#questionaireId = questionaireId
  }

  get intervieweeId(): string {
    return this.#intervieweeId
  }

  private set intervieweeId(intervieweeId: string) {
    this.#intervieweeId = intervieweeId
  }

  get answers(): Record<string, number | undefined> {
    return this.#answers
  }

  private set answers(answers: Record<string, number>) {
    this.#answers = answers
  }

  get createdAt(): Date {
    return this.#createdAt
  }

  private set createdAt(createdAt: Date) {
    this.#createdAt = createdAt
  }

  @Guard()
  start(
    @Against('id').NotUUID(4) id: string,
    @Against('intervieweeId').NotUUID(4) intervieweeId: string,
    @Against('questionaire').NotInstance(Questionaire) questionaire: Questionaire
  ): Survey {
    this.apply(
      new SurveyStartedEvent(
        id,
        questionaire.id,
        intervieweeId,
        SurveyStatus.STARTED,
        questionaire.questions.reduce(
          (result, question) => ({
            ...result,
            [question.id]: undefined,
          }),
          {}
        ),
        new Date()
      )
    )

    return this
  }

  @Guard()
  addAnswer(
    @Against('questionId').NotUUID(4) questionId: string,
    @Against('answer').NotNumberBetween(0, 10) answer: number
  ): Survey {
    if (this.status === SurveyStatus.COMPLETED) {
      throw new SurveyAlreadyCompletedError(this.id)
    }

    this.apply(new SurveyAnswerAddedEvent(this.id, questionId, answer))

    if (Object.values(this.answers).every((answr: number | undefined) => answr !== undefined)) {
      this.apply(
        new SurveyCompletedEvent(
          this.id,
          this.questionaireId,
          this.intervieweeId,
          this.answers as Record<string, number>,
          SurveyStatus.COMPLETED
        )
      )
    }

    return this
  }

  protected onSurveyStartedEvent(event: SurveyStartedEvent): void {
    this.#id = event.surveyId
    this.#status = event.status
    this.#questionaireId = event.questionaireId
    this.#intervieweeId = event.intervieweeId
    this.#answers = event.answers
    this.#createdAt = event.createdAt
  }

  protected onSurveyAnswerAddedEvent(event: SurveyAnswerAddedEvent): void {
    this.#answers[event.questionId] = event.answer
  }

  protected onSurveyCompletedEvent(event: SurveyCompletedEvent): void {
    this.#status = event.status
  }
}

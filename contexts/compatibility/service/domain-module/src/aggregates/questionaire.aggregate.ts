import { Guard }                            from '@monstrs/guard-clause'
import { Against }                          from '@monstrs/guard-clause'
import { AggregateRoot }                    from '@nestjs/cqrs'
import { v4 as uuid }                       from 'uuid'

import { Question }                         from '../entities/index.js'
import { QuestionaireStatus }               from '../enums/index.js'
import { QuestionaireQuestionNotFound }     from '../errors/index.js'
import { QuestionaireCreatedEvent }         from '../events/index.js'
import { QuestionaireNameChangedEvent }     from '../events/index.js'
import { QuestionairePhotoChangedEvent }    from '../events/index.js'
import { QuestionaireActivatedEvent }       from '../events/index.js'
import { QuestionaireDeactivatedEvent }     from '../events/index.js'
import { QuestionaireQuestionAddedEvent }   from '../events/index.js'
import { QuestionaireQuestionChangedEvent } from '../events/index.js'
import { QuestionaireQuestionDeletedEvent } from '../events/index.js'

export class Questionaire extends AggregateRoot {
  #id!: string

  #status!: QuestionaireStatus

  #name!: string

  #photoId?: string

  #questions: Array<Question> = []

  #createdAt!: Date

  get id(): string {
    return this.#id
  }

  private set id(id: string) {
    this.#id = id
  }

  get status(): QuestionaireStatus {
    return this.#status
  }

  private set status(status: QuestionaireStatus) {
    this.#status = status
  }

  get name(): string {
    return this.#name
  }

  private set name(name: string) {
    this.#name = name
  }

  get photoId(): string | undefined {
    return this.#photoId
  }

  private set photoId(photoId: string) {
    this.#photoId = photoId
  }

  get questions(): Array<Question> {
    return this.#questions
  }

  private set questions(questions: Array<Question>) {
    this.#questions = questions
  }

  get createdAt(): Date {
    return this.#createdAt
  }

  private set createdAt(createdAt: Date) {
    this.#createdAt = createdAt
  }

  @Guard()
  create(
    @Against('id').NotUUID(4) id: string,
    @Against('name').Empty() name: string
  ): Questionaire {
    this.apply(new QuestionaireCreatedEvent(id, QuestionaireStatus.INACTIVE, name, new Date()))

    return this
  }

  @Guard()
  changeName(@Against('name').Empty() name: string): Questionaire {
    this.apply(new QuestionaireNameChangedEvent(this.id, name))

    return this
  }

  @Guard()
  changePhoto(@Against('photoId').NotUUID(4) photoId: string): Questionaire {
    this.apply(new QuestionairePhotoChangedEvent(this.id, photoId))

    return this
  }

  @Guard()
  activate(): Questionaire {
    this.apply(new QuestionaireActivatedEvent(this.id, QuestionaireStatus.ACTIVE))

    return this
  }

  @Guard()
  deactivate(): Questionaire {
    this.apply(new QuestionaireDeactivatedEvent(this.id, QuestionaireStatus.INACTIVE))

    return this
  }

  @Guard()
  addQuestion(@Against('content').Empty() content: string): Questionaire {
    this.apply(new QuestionaireQuestionAddedEvent(this.#id, uuid(), content))

    return this
  }

  @Guard()
  changeQuestion(
    @Against('questionId').NotUUID(4) questionId: string,
    @Against('content').Empty() content: string
  ): Questionaire {
    if (!this.questions.find((question) => question.id === questionId)) {
      throw new QuestionaireQuestionNotFound(questionId)
    }

    this.apply(new QuestionaireQuestionChangedEvent(this.#id, questionId, content))

    return this
  }

  @Guard()
  deleteQuestion(@Against('questionId').NotUUID(4) questionId: string): Questionaire {
    if (!this.questions.find((question) => question.id === questionId)) {
      throw new QuestionaireQuestionNotFound(questionId)
    }

    this.apply(new QuestionaireQuestionDeletedEvent(this.#id, questionId))

    return this
  }

  protected onQuestionaireCreatedEvent(event: QuestionaireCreatedEvent): void {
    this.#id = event.questionaireId
    this.#status = event.status
    this.#name = event.name
    this.#createdAt = event.createdAt
  }

  protected onQuestionaireNameChangedEvent(event: QuestionaireNameChangedEvent): void {
    this.#name = event.name
  }

  protected onQuestionairePhotoChangedEvent(event: QuestionairePhotoChangedEvent): void {
    this.#photoId = event.photoId
  }

  protected onQuestionaireActivatedEvent(event: QuestionaireActivatedEvent): void {
    this.#status = event.status
  }

  protected onQuestionaireDeactivatedEvent(event: QuestionaireDeactivatedEvent): void {
    this.#status = event.status
  }

  protected onQuestionaireQuestionAddedEvent(event: QuestionaireQuestionAddedEvent): void {
    this.#questions.push(Question.create(event.questionId, event.content))
  }

  protected onQuestionaireQuestionChangedEvent(event: QuestionaireQuestionChangedEvent): void {
    this.#questions = this.#questions.map((question) => {
      if (question.id === event.questionId) {
        return Question.create(event.questionId, event.content)
      }

      return question
    })
  }

  protected onQuestionaireQuestionDeletedEvent(event: QuestionaireQuestionDeletedEvent): void {
    this.#questions = this.#questions.filter((question) => question.id !== event.questionId)
  }
}

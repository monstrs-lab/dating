import { Guard }                     from '@monstrs/guard-clause'
import { Against }                   from '@monstrs/guard-clause'
import { AggregateRoot }             from '@nestjs/cqrs'

import { CompatibilityCreatedEvent } from '../events/index.js'

export class Compatibility extends AggregateRoot {
  #id!: string

  #questionaireId!: string

  #intervieweeId!: string

  #answers!: Record<string, number>

  #mean!: number

  #createdAt!: Date

  get id(): string {
    return this.#id
  }

  private set id(id: string) {
    this.#id = id
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

  get answers(): Record<string, number> {
    return this.#answers
  }

  private set answers(answers: Record<string, number>) {
    this.#answers = answers
  }

  get mean(): number {
    return this.#mean
  }

  private set mean(mean: number) {
    this.#mean = mean
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
    @Against('questionaireId').NotUUID(4) questionaireId: string,
    @Against('intervieweeId').NotUUID(4) intervieweeId: string,
    @Against('answers').Empty() answers: Record<string, number>,
    @Against('mean').NotNumberBetween(0, Infinity) mean: number
  ): Compatibility {
    this.apply(
      new CompatibilityCreatedEvent(id, questionaireId, intervieweeId, answers, mean, new Date())
    )

    return this
  }

  protected onCompatibilityCreatedEvent(event: CompatibilityCreatedEvent): void {
    this.#id = event.compatibilityId
    this.#questionaireId = event.questionaireId
    this.#intervieweeId = event.intervieweeId
    this.#answers = event.answers
    this.#mean = event.mean
    this.#createdAt = event.createdAt
  }
}

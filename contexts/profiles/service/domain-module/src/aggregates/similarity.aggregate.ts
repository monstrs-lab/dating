import { Guard }                  from '@monstrs/guard-clause'
import { Against }                from '@monstrs/guard-clause'
import { AggregateRoot }          from '@nestjs/cqrs'
import { v4 as uuid }             from 'uuid'
import similarity                 from 'compute-cosine-similarity'

import { SimilarityCreatedEvent } from '../events/index.js'
import { Compatibility }          from './compatibility.aggregate.js'

export class Similarity extends AggregateRoot {
  #id!: string

  #compatibilityId!: string

  #fromId!: string

  #toId!: string

  #value!: number

  #createdAt!: Date

  get id(): string {
    return this.#id
  }

  private set id(id: string) {
    this.#id = id
  }

  get compatibilityId(): string {
    return this.#compatibilityId
  }

  private set compatibilityId(compatibilityId: string) {
    this.#compatibilityId = compatibilityId
  }

  get fromId(): string {
    return this.#fromId
  }

  private set fromId(fromId: string) {
    this.#fromId = fromId
  }

  get toId(): string {
    return this.#toId
  }

  private set toId(toId: string) {
    this.#toId = toId
  }

  get value(): number {
    return this.#value
  }

  private set value(value: number) {
    this.#value = value
  }

  get createdAt(): Date {
    return this.#createdAt
  }

  private set createdAt(createdAt: Date) {
    this.#createdAt = createdAt
  }

  @Guard()
  calculate(
    @Against('compatibilityId').NotUUID(4) compatibilityId: string,
    @Against('from').NotInstance(Compatibility) from: Compatibility,
    @Against('to').NotInstance(Compatibility) to: Compatibility
  ): Similarity {
    const value = similarity(
      Object.keys(from.answers).map((answer) => from.answers[answer] || 0),
      Object.keys(from.answers).map((answer) => to.answers[answer] || 0)
    )

    this.apply(
      new SimilarityCreatedEvent(
        uuid(),
        compatibilityId,
        from.intervieweeId,
        to.intervieweeId,
        value || 0,
        new Date()
      )
    )

    return this
  }

  protected onSimilarityCreatedEvent(event: SimilarityCreatedEvent): void {
    this.#id = event.similarityId
    this.#compatibilityId = event.compabilityId
    this.#fromId = event.fromId
    this.#toId = event.toId
    this.#value = event.value
    this.#createdAt = event.createdAt
  }
}

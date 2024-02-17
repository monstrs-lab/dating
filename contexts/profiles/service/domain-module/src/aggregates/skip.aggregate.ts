import { Guard }            from '@monstrs/guard-clause'
import { Against }          from '@monstrs/guard-clause'
import { AggregateRoot }    from '@nestjs/cqrs'
import { v4 as uuid }       from 'uuid'

import { SkipCreatedEvent } from '../events/index.js'

export class Skip extends AggregateRoot {
  #id!: string

  #profileId!: string

  #targetId!: string

  #createdAt!: Date

  get id(): string {
    return this.#id
  }

  private set id(id: string) {
    this.#id = id
  }

  get profileId(): string {
    return this.#profileId
  }

  private set profileId(profileId: string) {
    this.#profileId = profileId
  }

  get targetId(): string {
    return this.#targetId
  }

  private set targetId(targetId: string) {
    this.#targetId = targetId
  }

  get createdAt(): Date {
    return this.#createdAt
  }

  private set createdAt(createdAt: Date) {
    this.#createdAt = createdAt
  }

  @Guard()
  create(
    @Against('profileId').NotUUID(4) profileId: string,
    @Against('targetId').NotUUID(4) targetId: string
  ): Skip {
    this.apply(new SkipCreatedEvent(uuid(), profileId, targetId, new Date()))

    return this
  }

  protected onSkipCreatedEvent(event: SkipCreatedEvent): void {
    this.#id = event.skipId
    this.#profileId = event.profileId
    this.#targetId = event.targetId
    this.#createdAt = event.createdAt
  }
}

import { Guard }                      from '@monstrs/guard-clause'
import { Against }                    from '@monstrs/guard-clause'
import { AggregateRoot }              from '@nestjs/cqrs'

import { ProfileGender }              from '../enums/index.js'
import { ProfileCreatedEvent }        from '../events/index.js'
import { ProfileGenderSelectedEvent } from '../events/index.js'
import { ProfileNameChangedEvent }    from '../events/index.js'

export class Profile extends AggregateRoot {
  #id!: string

  #gender?: ProfileGender

  #name?: string

  #createdAt!: Date

  get id(): string {
    return this.#id
  }

  private set id(id: string) {
    this.#id = id
  }

  get gender(): ProfileGender | undefined {
    return this.#gender
  }

  private set gender(gender: ProfileGender) {
    this.#gender = gender
  }

  get name(): string | undefined {
    return this.#name
  }

  private set name(name: string) {
    this.#name = name
  }

  get createdAt(): Date {
    return this.#createdAt
  }

  private set createdAt(createdAt: Date) {
    this.#createdAt = createdAt
  }

  @Guard()
  create(@Against('id').NotUUID(4) id: string): Profile {
    this.apply(new ProfileCreatedEvent(id, new Date()))

    return this
  }

  @Guard()
  selectGender(@Against('gender').NotEnum(ProfileGender) gender: ProfileGender): Profile {
    this.apply(new ProfileGenderSelectedEvent(this.id, gender))

    return this
  }

  @Guard()
  changeName(@Against('name').Empty() name: string): Profile {
    this.apply(new ProfileNameChangedEvent(this.id, name))

    return this
  }

  protected onProfileCreatedEvent(event: ProfileCreatedEvent): void {
    this.#id = event.profileId
    this.#createdAt = event.createdAt
  }

  protected onProfileGenderSelectedEvent(event: ProfileGenderSelectedEvent): void {
    this.#gender = event.gender
  }

  protected onProfileNameChangedEvent(event: ProfileNameChangedEvent): void {
    this.#name = event.name
  }
}

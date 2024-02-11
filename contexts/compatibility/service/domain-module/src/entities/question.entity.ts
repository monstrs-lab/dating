import { Guard }   from '@monstrs/guard-clause'
import { Against } from '@monstrs/guard-clause'

export class Question {
  #id!: string

  #content!: string

  get id(): string {
    return this.#id
  }

  private set id(id: string) {
    this.#id = id
  }

  get content(): string {
    return this.#content
  }

  private set content(content: string) {
    this.#content = content
  }

  @Guard()
  static create(
    @Against('id').NotUUID(4) id: string,
    @Against('content').Empty() content: string
  ): Question {
    const question = new Question()

    question.id = id
    question.content = content

    return question
  }
}

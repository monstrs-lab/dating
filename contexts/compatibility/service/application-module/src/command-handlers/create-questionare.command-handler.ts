import type { ICommandHandler }      from '@nestjs/cqrs'

import { CommandHandler }            from '@nestjs/cqrs'

import { Questionaire }              from '@compatibility/domain-module'

import { CreateQuestionaireCommand } from '../commands/index.js'
import { QuestionaireRepository }    from '../repositories/index.js'

@CommandHandler(CreateQuestionaireCommand)
export class CreateQuestionaireCommandHandler
  implements ICommandHandler<CreateQuestionaireCommand, void>
{
  constructor(private readonly questionaireRepository: QuestionaireRepository) {}

  async execute(command: CreateQuestionaireCommand): Promise<void> {
    await this.questionaireRepository.save(
      new Questionaire().create(command.questionaireId, command.name)
    )
  }
}

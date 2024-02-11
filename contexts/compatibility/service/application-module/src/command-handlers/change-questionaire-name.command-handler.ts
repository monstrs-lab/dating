import type { ICommandHandler }          from '@nestjs/cqrs'

import assert                            from 'node:assert'

import { CommandHandler }                from '@nestjs/cqrs'

import { ChangeQuestionaireNameCommand } from '../commands/index.js'
import { QuestionaireRepository }        from '../repositories/index.js'

@CommandHandler(ChangeQuestionaireNameCommand)
export class ChangeQuestionaireNameCommandHandler
  implements ICommandHandler<ChangeQuestionaireNameCommand, void>
{
  constructor(private readonly questionaireRepository: QuestionaireRepository) {}

  async execute(command: ChangeQuestionaireNameCommand): Promise<void> {
    const questionaire = await this.questionaireRepository.findById(command.questionaireId)

    assert.ok(questionaire, 'Questionaire not found')

    await this.questionaireRepository.save(questionaire.changeName(command.name))
  }
}

import type { ICommandHandler }        from '@nestjs/cqrs'

import assert                          from 'node:assert'

import { CommandHandler }              from '@nestjs/cqrs'

import { ActivateQuestionaireCommand } from '../commands/index.js'
import { QuestionaireRepository }      from '../repositories/index.js'

@CommandHandler(ActivateQuestionaireCommand)
export class ActivateQuestionaireCommandHandler
  implements ICommandHandler<ActivateQuestionaireCommand, void>
{
  constructor(private readonly questionaireRepository: QuestionaireRepository) {}

  async execute(command: ActivateQuestionaireCommand): Promise<void> {
    const questionaire = await this.questionaireRepository.findById(command.questionaireId)

    assert.ok(questionaire, 'Questionaire not found')

    await this.questionaireRepository.save(questionaire.activate())
  }
}

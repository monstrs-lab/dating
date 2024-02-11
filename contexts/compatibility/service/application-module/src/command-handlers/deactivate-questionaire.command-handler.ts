import type { ICommandHandler }          from '@nestjs/cqrs'

import assert                            from 'node:assert'

import { CommandHandler }                from '@nestjs/cqrs'

import { DeactivateQuestionaireCommand } from '../commands/index.js'
import { QuestionaireRepository }        from '../repositories/index.js'

@CommandHandler(DeactivateQuestionaireCommand)
export class DeactivateQuestionaireCommandHandler
  implements ICommandHandler<DeactivateQuestionaireCommand, void>
{
  constructor(private readonly questionaireRepository: QuestionaireRepository) {}

  async execute(command: DeactivateQuestionaireCommand): Promise<void> {
    const questionaire = await this.questionaireRepository.findById(command.questionaireId)

    assert.ok(questionaire, 'Questionaire not found')

    await this.questionaireRepository.save(questionaire.deactivate())
  }
}

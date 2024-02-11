import type { ICommandHandler }           from '@nestjs/cqrs'

import assert                             from 'node:assert'

import { CommandHandler }                 from '@nestjs/cqrs'

import { AddQuestionaireQuestionCommand } from '../commands/index.js'
import { QuestionaireRepository }         from '../repositories/index.js'

@CommandHandler(AddQuestionaireQuestionCommand)
export class AddQuestionaireQuestionCommandHandler
  implements ICommandHandler<AddQuestionaireQuestionCommand, void>
{
  constructor(private readonly questionaireRepository: QuestionaireRepository) {}

  async execute(command: AddQuestionaireQuestionCommand): Promise<void> {
    const questionaire = await this.questionaireRepository.findById(command.questionaireId)

    assert.ok(questionaire, 'Questionaire not found')

    await this.questionaireRepository.save(questionaire.addQuestion(command.content))
  }
}

import type { ICommandHandler }              from '@nestjs/cqrs'

import assert                                from 'node:assert'

import { CommandHandler }                    from '@nestjs/cqrs'

import { ChangeQuestionaireQuestionCommand } from '../commands/index.js'
import { QuestionaireRepository }            from '../repositories/index.js'

@CommandHandler(ChangeQuestionaireQuestionCommand)
export class ChangeQuestionaireQuestionCommandHandler
  implements ICommandHandler<ChangeQuestionaireQuestionCommand, void>
{
  constructor(private readonly questionaireRepository: QuestionaireRepository) {}

  async execute(command: ChangeQuestionaireQuestionCommand): Promise<void> {
    const questionaire = await this.questionaireRepository.findById(command.questionaireId)

    assert.ok(questionaire, 'Questionaire not found')

    await this.questionaireRepository.save(
      questionaire.changeQuestion(command.questionId, command.content)
    )
  }
}

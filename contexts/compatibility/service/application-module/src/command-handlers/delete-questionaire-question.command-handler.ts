import type { ICommandHandler }              from '@nestjs/cqrs'

import assert                                from 'node:assert'

import { CommandHandler }                    from '@nestjs/cqrs'

import { DeleteQuestionaireQuestionCommand } from '../commands/index.js'
import { QuestionaireRepository }            from '../repositories/index.js'

@CommandHandler(DeleteQuestionaireQuestionCommand)
export class DeleteQuestionaireQuestionCommandHandler
  implements ICommandHandler<DeleteQuestionaireQuestionCommand, void>
{
  constructor(private readonly questionaireRepository: QuestionaireRepository) {}

  async execute(command: DeleteQuestionaireQuestionCommand): Promise<void> {
    const questionaire = await this.questionaireRepository.findById(command.questionaireId)

    assert.ok(questionaire, 'Questionaire not found')

    await this.questionaireRepository.save(questionaire.deleteQuestion(command.questionId))
  }
}

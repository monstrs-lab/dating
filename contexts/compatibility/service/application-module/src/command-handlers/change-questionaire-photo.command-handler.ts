import type { ICommandHandler }           from '@nestjs/cqrs'

import assert                             from 'node:assert'

import { CommandHandler }                 from '@nestjs/cqrs'

import { ChangeQuestionairePhotoCommand } from '../commands/index.js'
import { QuestionaireRepository }         from '../repositories/index.js'

@CommandHandler(ChangeQuestionairePhotoCommand)
export class ChangeQuestionairePhotoCommandHandler
  implements ICommandHandler<ChangeQuestionairePhotoCommand, void>
{
  constructor(private readonly questionaireRepository: QuestionaireRepository) {}

  async execute(command: ChangeQuestionairePhotoCommand): Promise<void> {
    const questionaire = await this.questionaireRepository.findById(command.questionaireId)

    assert.ok(questionaire, 'Questionaire not found')

    await this.questionaireRepository.save(questionaire.changePhoto(command.photoId))
  }
}

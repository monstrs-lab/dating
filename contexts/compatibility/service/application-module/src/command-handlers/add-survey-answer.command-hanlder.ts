import type { ICommandHandler }   from '@nestjs/cqrs'

import assert                     from 'node:assert'

import { CommandHandler }         from '@nestjs/cqrs'

import { AddSurveyAnswerCommand } from '../commands/index.js'
import { SurveyRepository }       from '../repositories/index.js'

@CommandHandler(AddSurveyAnswerCommand)
export class AddSurveyAnswerCommandHandler
  implements ICommandHandler<AddSurveyAnswerCommand, void>
{
  constructor(private readonly surveyRepository: SurveyRepository) {}

  async execute(command: AddSurveyAnswerCommand): Promise<void> {
    const survey = await this.surveyRepository.findById(command.surveyId)

    assert.ok(survey, 'Questionaire not found')

    await this.surveyRepository.save(survey.addAnswer(command.questionId, command.answer))
  }
}

import type { ICommandHandler }   from '@nestjs/cqrs'

import assert                     from 'node:assert'

import { CommandHandler }         from '@nestjs/cqrs'

import { Survey }                 from '@compatibility/domain-module'

import { StartSurveyCommand }     from '../commands/index.js'
import { QuestionaireRepository } from '../repositories/index.js'
import { SurveyRepository }       from '../repositories/index.js'

@CommandHandler(StartSurveyCommand)
export class StartSurveyCommandHandler implements ICommandHandler<StartSurveyCommand, void> {
  constructor(
    private readonly questionaireRepository: QuestionaireRepository,
    private readonly surveyRepository: SurveyRepository
  ) {}

  async execute(command: StartSurveyCommand): Promise<void> {
    const questionaire = await this.questionaireRepository.findById(command.questionaireId)

    assert.ok(questionaire, 'Questionaire not found')

    const {
      surveys: [survey],
    } = await this.surveyRepository.findByQuery({
      query: {
        intervieweeId: {
          conditions: {
            eq: {
              value: command.intervieweeId,
            },
          },
        },
        questionaireId: {
          conditions: {
            eq: {
              value: command.questionaireId,
            },
          },
        },
      },
    })

    if (!survey) {
      await this.surveyRepository.save(
        new Survey().start(command.surveyId, command.intervieweeId, questionaire)
      )
    }
  }
}

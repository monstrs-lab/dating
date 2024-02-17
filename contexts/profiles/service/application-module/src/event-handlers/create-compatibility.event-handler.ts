import type { IEventHandler }      from '@nestjs/cqrs'

import { EventsHandler }           from '@nestjs/cqrs'

import { SurveyCompletedEvent }    from '@compatibility/domain-module'
import { Compatibility }           from '@profiles/domain-module'

import { CompatibilityRepository } from '../repositories/index.js'

@EventsHandler(SurveyCompletedEvent)
export class CreateCompatibilityEventHandler implements IEventHandler<SurveyCompletedEvent> {
  constructor(private readonly compatibilityRepository: CompatibilityRepository) {}

  async handle(event: SurveyCompletedEvent): Promise<void> {
    const mean =
      Object.values(event.answers).reduce((result, answer) => result + answer, 0) /
      Object.values(event.answers).length

    await this.compatibilityRepository.save(
      new Compatibility().create(
        event.surveyId,
        event.questionaireId,
        event.intervieweeId,
        event.answers,
        mean
      )
    )
  }
}

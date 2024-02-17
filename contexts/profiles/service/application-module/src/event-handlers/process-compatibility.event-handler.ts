import type { IEventHandler }          from '@nestjs/cqrs'

import type { CompatibilityQueueData } from '../queues/index.js'

import { InjectQueue }                 from '@nestjs/bull'
import { EventsHandler }               from '@nestjs/cqrs'
import { Queue }                       from 'bull'

import { CompatibilityCreatedEvent }   from '@profiles/domain-module'

import { COMPATIBILITY_QUEUE }         from '../queues/index.js'

@EventsHandler(CompatibilityCreatedEvent)
export class ProcessCompatibilityEventHandler implements IEventHandler<CompatibilityCreatedEvent> {
  constructor(
    @InjectQueue(COMPATIBILITY_QUEUE)
    private readonly compatibilityQueue: Queue<CompatibilityQueueData>
  ) {}

  async handle(event: CompatibilityCreatedEvent): Promise<void> {
    await this.compatibilityQueue.add({
      compatibilityId: event.compatibilityId,
    })
  }
}

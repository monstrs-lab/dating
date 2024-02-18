import type { ICommandHandler } from '@nestjs/cqrs'

import { CommandHandler }       from '@nestjs/cqrs'

import { Skip }                 from '@profiles/domain-module'

import { SkipProfileCommand }   from '../commands/index.js'
import { SkipRepository }       from '../repositories/index.js'

@CommandHandler(SkipProfileCommand)
export class SkipProfileCommandHandler implements ICommandHandler<SkipProfileCommand, void> {
  constructor(private readonly skipRepository: SkipRepository) {}

  async execute(command: SkipProfileCommand): Promise<void> {
    await this.skipRepository.save(new Skip().create(command.profileId, command.targetId))
  }
}

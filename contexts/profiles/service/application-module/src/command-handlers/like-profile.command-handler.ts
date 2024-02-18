import type { ICommandHandler } from '@nestjs/cqrs'

import { CommandHandler }       from '@nestjs/cqrs'

import { Like }                 from '@profiles/domain-module'

import { LikeProfileCommand }   from '../commands/index.js'
import { LikeRepository }       from '../repositories/index.js'

@CommandHandler(LikeProfileCommand)
export class LikeProfileCommandHandler implements ICommandHandler<LikeProfileCommand, void> {
  constructor(private readonly likeRepository: LikeRepository) {}

  async execute(command: LikeProfileCommand): Promise<void> {
    await this.likeRepository.save(new Like().create(command.profileId, command.targetId))
  }
}

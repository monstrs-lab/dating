import type { ICommandHandler } from '@nestjs/cqrs'

import { CommandHandler }       from '@nestjs/cqrs'

import { Profile }              from '@profiles/domain-module'

import { CreateProfileCommand } from '../commands/index.js'
import { ProfileRepository }    from '../repositories/index.js'

@CommandHandler(CreateProfileCommand)
export class CreateProfileCommandHandler implements ICommandHandler<CreateProfileCommand, void> {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async execute(command: CreateProfileCommand): Promise<void> {
    await this.profileRepository.save(new Profile().create(command.profileId))
  }
}

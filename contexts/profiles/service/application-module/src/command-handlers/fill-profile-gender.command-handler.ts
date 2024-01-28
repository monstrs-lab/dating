import type { ICommandHandler }     from '@nestjs/cqrs'

import assert                       from 'node:assert'

import { CommandHandler }           from '@nestjs/cqrs'

import { FillProfileGenderCommand } from '../commands/index.js'
import { ProfileRepository }        from '../repositories/index.js'

@CommandHandler(FillProfileGenderCommand)
export class FillProfileGenderCommandHandler
  implements ICommandHandler<FillProfileGenderCommand, void>
{
  constructor(private readonly profileRepository: ProfileRepository) {}

  async execute(command: FillProfileGenderCommand): Promise<void> {
    const profile = await this.profileRepository.findById(command.profileId)

    assert.ok(profile, 'Profile not found')

    await this.profileRepository.save(profile.fillGender(command.gender))
  }
}

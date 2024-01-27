import type { ICommandHandler }       from '@nestjs/cqrs'

import assert                         from 'node:assert'

import { CommandHandler }             from '@nestjs/cqrs'

import { SelectProfileGenderCommand } from '../commands/index.js'
import { ProfileRepository }          from '../repositories/index.js'

@CommandHandler(SelectProfileGenderCommand)
export class SelectProfileGenderCommandHandler
  implements ICommandHandler<SelectProfileGenderCommand, void>
{
  constructor(private readonly profileRepository: ProfileRepository) {}

  async execute(command: SelectProfileGenderCommand): Promise<void> {
    const profile = await this.profileRepository.findById(command.profileId)

    assert.ok(profile, 'Profile not found')

    await this.profileRepository.save(profile.selectGender(command.gender))
  }
}

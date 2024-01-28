import type { ICommandHandler }   from '@nestjs/cqrs'

import assert                     from 'node:assert'

import { CommandHandler }         from '@nestjs/cqrs'

import { FillProfileNameCommand } from '../commands/index.js'
import { ProfileRepository }      from '../repositories/index.js'

@CommandHandler(FillProfileNameCommand)
export class FillProfileNameCommandHandler
  implements ICommandHandler<FillProfileNameCommand, void>
{
  constructor(private readonly profileRepository: ProfileRepository) {}

  async execute(command: FillProfileNameCommand): Promise<void> {
    const profile = await this.profileRepository.findById(command.profileId)

    assert.ok(profile, 'Profile not found')

    await this.profileRepository.save(profile.fillName(command.name))
  }
}

import type { ICommandHandler }     from '@nestjs/cqrs'

import assert                       from 'node:assert'

import { CommandHandler }           from '@nestjs/cqrs'

import { ChangeProfileNameCommand } from '../commands/index.js'
import { ProfileRepository }        from '../repositories/index.js'

@CommandHandler(ChangeProfileNameCommand)
export class ChangeProfileNameCommandHandler
  implements ICommandHandler<ChangeProfileNameCommand, void>
{
  constructor(private readonly profileRepository: ProfileRepository) {}

  async execute(command: ChangeProfileNameCommand): Promise<void> {
    const profile = await this.profileRepository.findById(command.profileId)

    assert.ok(profile, 'Profile not found')

    await this.profileRepository.save(profile.changeName(command.name))
  }
}

import type { ICommandHandler }    from '@nestjs/cqrs'

import assert                      from 'node:assert'

import { CommandHandler }          from '@nestjs/cqrs'

import { AddProfilePhotosCommand } from '../commands/index.js'
import { ProfileRepository }       from '../repositories/index.js'

@CommandHandler(AddProfilePhotosCommand)
export class AddProfilePhotosCommandHandler
  implements ICommandHandler<AddProfilePhotosCommand, void>
{
  constructor(private readonly profileRepository: ProfileRepository) {}

  async execute(command: AddProfilePhotosCommand): Promise<void> {
    const profile = await this.profileRepository.findById(command.profileId)

    assert.ok(profile, 'Profile not found')

    await this.profileRepository.save(profile.addPhoto(command.photoId))
  }
}

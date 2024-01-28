import type { ICommandHandler }          from '@nestjs/cqrs'

import assert                            from 'node:assert'

import { CommandHandler }                from '@nestjs/cqrs'

import { FillProfileGeopositionCommand } from '../commands/index.js'
import { GeocoderPort }                  from '../ports/index.js'
import { ProfileRepository }             from '../repositories/index.js'

@CommandHandler(FillProfileGeopositionCommand)
export class FillProfileGeopositionCommandHandler
  implements ICommandHandler<FillProfileGeopositionCommand, void>
{
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly geocodePort: GeocoderPort
  ) {}

  async execute(command: FillProfileGeopositionCommand): Promise<void> {
    const profile = await this.profileRepository.findById(command.profileId)

    assert.ok(profile, 'Profile not found')

    await this.profileRepository.save(
      profile.fillGeoposition(
        await this.geocodePort.getLocation(command.latitude, command.longitude),
        command.latitude,
        command.longitude
      )
    )
  }
}

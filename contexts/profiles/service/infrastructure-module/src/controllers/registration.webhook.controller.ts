// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { IdentityBody }    from '../webhooks/index.js'

import { Logger }               from '@monstrs/logger'
import { Body }                 from '@nestjs/common'
import { Controller }           from '@nestjs/common'
import { Post }                 from '@nestjs/common'
import { CommandBus }           from '@nestjs/cqrs'

import { CreateProfileCommand } from '@profiles/application-module'

@Controller('kratos/webhooks/registration/password')
export class RegistrationPasswordWebhooksController {
  #logger = new Logger(RegistrationPasswordWebhooksController.name)

  constructor(private readonly commandBus: CommandBus) {}

  @Post('after')
  async after(@Body() body: IdentityBody): Promise<object> {
    try {
      const command = new CreateProfileCommand(body.id)

      await this.commandBus.execute(command)

      return {}
    } catch (error) {
      this.#logger.error(error)

      throw error
    }
  }
}

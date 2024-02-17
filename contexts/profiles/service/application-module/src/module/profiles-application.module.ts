import type { DynamicModule }  from '@nestjs/common'

import { BullModule }          from '@nestjs/bull'
import { Module }              from '@nestjs/common'

import * as commandhandlers    from '../command-handlers/index.js'
import * as eventhandlers      from '../event-handlers/index.js'
import * as processors         from '../processors/index.js'
import * as queryhandlers      from '../query-handlers/index.js'
import { COMPATIBILITY_QUEUE } from '../queues/index.js'

@Module({})
export class ProfilesApplicationModule {
  static register(): DynamicModule {
    return {
      module: ProfilesApplicationModule,
      imports: [
        BullModule.registerQueue({
          name: COMPATIBILITY_QUEUE,
        }),
      ],
      providers: [
        ...Object.values(commandhandlers),
        ...Object.values(eventhandlers),
        ...Object.values(queryhandlers),
        ...Object.values(processors),
      ],
    }
  }
}

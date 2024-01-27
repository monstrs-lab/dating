import type { DynamicModule }       from '@nestjs/common'

import { Module }                   from '@nestjs/common'

import * as dataloaders             from '../dataloaders/index.js'
import { ProfilesClient }           from '../client/index.js'
import { ProfilesClientCoreModule } from './profiles-client.core.module.js'

@Module({})
export class ProfilesClientModule {
  static register(
    options: { baseUrl?: string; idleConnectionTimeoutMs?: number } = {}
  ): DynamicModule {
    return {
      module: ProfilesClientModule,
      imports: [ProfilesClientCoreModule.register(options)],
    }
  }

  static attach(): DynamicModule {
    return {
      module: ProfilesClientModule,
      providers: [ProfilesClient, ...Object.values(dataloaders)],
      exports: [ProfilesClient],
    }
  }
}

import type { DynamicModule }            from '@nestjs/common'

import { Module }                        from '@nestjs/common'

import * as dataloaders                  from '../dataloaders/index.js'
import { CompatibilityClient }           from '../client/index.js'
import { CompatibilityClientCoreModule } from './compatibility-client.core.module.js'

@Module({})
export class CompatibilityClientModule {
  static register(
    options: { baseUrl?: string; idleConnectionTimeoutMs?: number } = {}
  ): DynamicModule {
    return {
      module: CompatibilityClientModule,
      imports: [CompatibilityClientCoreModule.register(options)],
    }
  }

  static attach(): DynamicModule {
    return {
      module: CompatibilityClientModule,
      providers: [CompatibilityClient, ...Object.values(dataloaders)],
      exports: [CompatibilityClient],
    }
  }
}

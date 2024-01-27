import type { DynamicModule }            from '@nestjs/common'

import { Module }                        from '@nestjs/common'

import { StandaloneServiceConfigModule } from './standalone-service-config.module.js'
import { StandaloneServiceCoreModule }   from './standalone-service-core.module.js'

@Module({})
export class StandaloneServiceEntrypointModule {
  static build(): DynamicModule {
    return {
      module: StandaloneServiceEntrypointModule,
      imports: [StandaloneServiceConfigModule.register(), StandaloneServiceCoreModule.register()],
    }
  }
}

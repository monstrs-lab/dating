import type { DynamicModule }        from '@nestjs/common'

import { Module }                    from '@nestjs/common'

import { CompatibilityClientModule } from '@compatibility/client-module'

import * as controllers              from '../controllers/index.js'

@Module({})
export class CompatibilityBackofficeModule {
  static register(): DynamicModule {
    return {
      module: CompatibilityBackofficeModule,
      controllers: Object.values(controllers),
      imports: [CompatibilityClientModule.attach()],
    }
  }
}

import type { DynamicModule }        from '@nestjs/common'

import { Module }                    from '@nestjs/common'

import { CompatibilityClientModule } from '@compatibility/client-module'

import * as mutations                from '../mutations/index.js'
import * as resolvers                from '../resolvers/index.js'

@Module({})
export class CompatibilityGatewayModule {
  static register(): DynamicModule {
    return {
      module: CompatibilityGatewayModule,
      imports: [CompatibilityClientModule.attach()],
      providers: [...Object.values(resolvers), ...Object.values(mutations)],
    }
  }
}

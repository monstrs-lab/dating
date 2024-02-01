import type { DynamicModule }   from '@nestjs/common'

import { Module }               from '@nestjs/common'

import { ProfilesClientModule } from '@profiles/client-module'

import * as resolvers           from '../resolvers/index.js'

@Module({})
export class RecommendationsGatewayModule {
  static register(): DynamicModule {
    return {
      module: RecommendationsGatewayModule,
      imports: [ProfilesClientModule.attach()],
      providers: [...Object.values(resolvers)],
    }
  }
}

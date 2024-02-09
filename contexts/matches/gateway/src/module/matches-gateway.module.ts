import type { DynamicModule }   from '@nestjs/common'

import { Module }               from '@nestjs/common'

import { ProfilesClientModule } from '@profiles/client-module'

import * as resolvers           from '../resolvers/index.js'

@Module({})
export class MatchesGatewayModule {
  static register(): DynamicModule {
    return {
      module: MatchesGatewayModule,
      imports: [ProfilesClientModule.attach()],
      providers: [...Object.values(resolvers)],
    }
  }
}

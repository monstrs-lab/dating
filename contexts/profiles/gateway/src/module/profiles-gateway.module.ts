import type { DynamicModule }   from '@nestjs/common'

import { Module }               from '@nestjs/common'

import { ProfilesClientModule } from '@profiles/client-module'

import * as mutations           from '../mutations/index.js'
import * as resolvers           from '../resolvers/index.js'

@Module({})
export class ProfilesGatewayModule {
  static register(): DynamicModule {
    return {
      module: ProfilesGatewayModule,
      imports: [ProfilesClientModule.attach()],
      providers: [...Object.values(mutations), ...Object.values(resolvers)],
    }
  }
}

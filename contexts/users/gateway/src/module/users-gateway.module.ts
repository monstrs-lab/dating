import type { DynamicModule } from '@nestjs/common'

import { Module }             from '@nestjs/common'

import * as queries           from '../queries/index.js'
import * as resolvers         from '../resolvers/index.js'

@Module({})
export class UsersGatewayModule {
  static register(): DynamicModule {
    return {
      module: UsersGatewayModule,
      providers: [...Object.values(queries), ...Object.values(resolvers)],
    }
  }
}

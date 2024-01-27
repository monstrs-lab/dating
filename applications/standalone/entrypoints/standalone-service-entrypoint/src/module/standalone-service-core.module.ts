import type { DynamicModule }           from '@nestjs/common'

import { Module }                       from '@nestjs/common'

import { ProfilesGatewayModule }        from '@profiles/gateway-module'
import { ProfilesInfrastructureModule } from '@profiles/infrastructure-module'
import { UsersGatewayModule }           from '@users/gateway-module'

@Module({})
export class StandaloneServiceCoreModule {
  static register(): DynamicModule {
    return {
      module: StandaloneServiceCoreModule,
      imports: [
        ProfilesInfrastructureModule.register(),
        UsersGatewayModule.register(),
        ProfilesGatewayModule.register(),
      ],
    }
  }
}

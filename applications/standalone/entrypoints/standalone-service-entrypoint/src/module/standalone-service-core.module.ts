import type { DynamicModule }                from '@nestjs/common'

import { Module }                            from '@nestjs/common'

import { CompatibilityInfrastructureModule } from '@compatibility/infrastructure-module'
import { FilesGatewayModule }                from '@files/gateway-module'
import { MatchesGatewayModule }              from '@matches/gateway-module'
import { ProfilesGatewayModule }             from '@profiles/gateway-module'
import { ProfilesInfrastructureModule }      from '@profiles/infrastructure-module'
import { UsersGatewayModule }                from '@users/gateway-module'

@Module({})
export class StandaloneServiceCoreModule {
  static register(): DynamicModule {
    return {
      module: StandaloneServiceCoreModule,
      imports: [
        ProfilesInfrastructureModule.register(),
        CompatibilityInfrastructureModule.register(),
        UsersGatewayModule.register(),
        ProfilesGatewayModule.register(),
        FilesGatewayModule.register(),
        MatchesGatewayModule.register(),
      ],
    }
  }
}

import type { DynamicModule }                from '@nestjs/common'

import { Module }                            from '@nestjs/common'

import { CompatibilityBackofficeModule }     from '@compatibility/backoffice-module'
import { CompatibilityGatewayModule }        from '@compatibility/gateway-module'
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
        ProfilesGatewayModule.register(),
        CompatibilityInfrastructureModule.register(),
        CompatibilityBackofficeModule.register(),
        CompatibilityGatewayModule.register(),
        UsersGatewayModule.register(),
        FilesGatewayModule.register(),
        MatchesGatewayModule.register(),
      ],
    }
  }
}

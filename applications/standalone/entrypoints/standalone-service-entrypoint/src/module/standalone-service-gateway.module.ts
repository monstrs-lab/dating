import type { DynamicModule }           from '@nestjs/common'

import { Module }                       from '@nestjs/common'

import { ProfilesInfrastructureModule } from '@profiles/infrastructure-module'

@Module({})
export class StandaloneServiceGatewayModule {
  static register(): DynamicModule {
    return {
      module: StandaloneServiceGatewayModule,
      imports: [ProfilesInfrastructureModule.register()],
    }
  }
}

import type { DynamicModule }    from '@nestjs/common'

import { Module }                from '@nestjs/common'
import { createPromiseClient }   from '@connectrpc/connect'
import { createGrpcTransport }   from '@connectrpc/connect-node'

import { ProfilesService }       from '@profiles/profiles-rpc'

import { PROFILES_CLIENT_TOKEN } from '../constants/index.js'

@Module({})
export class ProfilesClientCoreModule {
  static register(
    options: { baseUrl?: string; idleConnectionTimeoutMs?: number } = {}
  ): DynamicModule {
    const client = createPromiseClient(
      ProfilesService,
      createGrpcTransport({
        httpVersion: '2',
        baseUrl: options.baseUrl || process.env.PROFILES_SERVICE_URL || 'http://0.0.0.0:50051',
        idleConnectionTimeoutMs: options.idleConnectionTimeoutMs,
      })
    )

    return {
      global: true,
      module: ProfilesClientCoreModule,
      providers: [
        {
          provide: PROFILES_CLIENT_TOKEN,
          useValue: client,
        },
      ],
      exports: [
        {
          provide: PROFILES_CLIENT_TOKEN,
          useValue: client,
        },
      ],
    }
  }
}

import type { DynamicModule }         from '@nestjs/common'

import { Module }                     from '@nestjs/common'
import { createPromiseClient }        from '@connectrpc/connect'
import { createGrpcTransport }        from '@connectrpc/connect-node'

import { CompatibilityService }       from '@compatibility/compatibility-rpc'

import { COMPATIBILITY_CLIENT_TOKEN } from '../constants/index.js'

@Module({})
export class CompatibilityClientCoreModule {
  static register(
    options: { baseUrl?: string; idleConnectionTimeoutMs?: number } = {}
  ): DynamicModule {
    const client = createPromiseClient(
      CompatibilityService,
      createGrpcTransport({
        httpVersion: '2',
        baseUrl: options.baseUrl || process.env.COMPATIBILITY_SERVICE_URL || 'http://0.0.0.0:50051',
        idleConnectionTimeoutMs: options.idleConnectionTimeoutMs,
      })
    )

    return {
      global: true,
      module: CompatibilityClientCoreModule,
      providers: [
        {
          provide: COMPATIBILITY_CLIENT_TOKEN,
          useValue: client,
        },
      ],
      exports: [
        {
          provide: COMPATIBILITY_CLIENT_TOKEN,
          useValue: client,
        },
      ],
    }
  }
}

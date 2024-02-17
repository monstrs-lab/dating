import type { ApolloDriverConfig }   from '@nestjs/apollo'
import type { DynamicModule }        from '@nestjs/common'
import type { OnModuleInit }         from '@nestjs/common'
import type { Request }              from 'express'

import { join }                      from 'node:path'
import { fileURLToPath }             from 'node:url'

import { MikroORM }                  from '@mikro-orm/core'
import { Migrator }                  from '@mikro-orm/migrations'
import { MikroOrmModule }            from '@mikro-orm/nestjs'
import { PostgreSqlDriver }          from '@mikro-orm/postgresql'
import { CqrsModule }                from '@monstrs/nestjs-cqrs'
import { RedisModule }               from '@monstrs/nestjs-redis'
import { RedisFactory }              from '@monstrs/nestjs-redis'
import { ApolloDriver }              from '@nestjs/apollo'
import { BullModule }                from '@nestjs/bull'
import { Module }                    from '@nestjs/common'
import { APP_INTERCEPTOR }           from '@nestjs/core'
import { GraphQLModule }             from '@nestjs/graphql'
import { DataLoaderInterceptor }     from 'nestjs-dataloader'

import { CompatibilityClientModule } from '@compatibility/client-module'
import { ProfilesClientModule }      from '@profiles/client-module'

import { entities }                  from '../entities/index.js'
import { migrations }                from '../migrations/index.js'

@Module({})
export class StandaloneServiceConfigModule implements OnModuleInit {
  constructor(private readonly orm: MikroORM) {}

  static register(): DynamicModule {
    return {
      global: true,
      module: StandaloneServiceConfigModule,
      imports: [
        CqrsModule.forRoot(),
        MikroOrmModule.forRoot({
          driver: PostgreSqlDriver,
          host: process.env.DB_HOST || 'localhost',
          dbName: 'db',
          user: 'postgres',
          password: 'password',
          entities: Object.values(entities),
          forceUndefined: true,
          migrations: {
            disableForeignKeys: false,
            migrationsList: Object.keys(migrations).map((name: string) => ({
              class: migrations[name as keyof typeof migrations],
              name,
            })),
          },
          extensions: [Migrator],
        }),
        BullModule.forRootAsync({
          imports: [RedisModule.register()],
          useFactory: (redisFactory: RedisFactory) => ({
            createClient: (type): ReturnType<typeof redisFactory.create> => {
              if (['bclient', 'subscriber'].includes(type)) {
                return redisFactory.create({
                  host: process.env.REDIS_HOST || 'localhost',
                  maxRetriesPerRequest: null,
                  enableReadyCheck: false,
                })
              }

              return redisFactory.create({
                host: process.env.REDIS_HOST || 'localhost',
              })
            },
          }),
          inject: [RedisFactory],
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: join(
            fileURLToPath(new URL('.', import.meta.url)),
            '../../schema.graphql'
          ),
          introspection: true,
          playground: {
            settings: {
              'request.credentials': 'include',
            },
          },
          path: '///',
          context: ({
            req,
            extra,
          }: {
            req?: Request
            extra: Record<string, string | undefined>
          }) => {
            const user = req?.get('x-user') || extra?.user

            return {
              user: user !== 'guest' ? user : null,
            }
          },
        }),
        ProfilesClientModule.register(),
        CompatibilityClientModule.register(),
      ],
      exports: [MikroOrmModule],
      providers: [
        {
          provide: APP_INTERCEPTOR,
          useClass: DataLoaderInterceptor,
        },
      ],
    }
  }

  async onModuleInit(): Promise<void> {
    await this.orm.getMigrator().up()
  }
}

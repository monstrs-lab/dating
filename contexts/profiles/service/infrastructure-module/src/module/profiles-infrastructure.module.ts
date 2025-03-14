import type { DynamicModule }          from '@nestjs/common'

import { MikroOrmModule }              from '@mikro-orm/nestjs'
import { ValidationModule }            from '@monstrs/nestjs-validation'
import { Module }                      from '@nestjs/common'

import { ProfilesApplicationModule }   from '@profiles/application-module'
import { ProfileRepository }           from '@profiles/application-module'
import { SkipRepository }              from '@profiles/application-module'
import { CompatibilityRepository }     from '@profiles/application-module'
import { SimilarityRepository }        from '@profiles/application-module'
import { LikeRepository }              from '@profiles/application-module'
import { GeocoderPort }                from '@profiles/application-module'

import * as controllers                from '../controllers/index.js'
import * as entities                   from '../entities/index.js'
import * as mappers                    from '../mappers/index.js'
import { GeocoderPortImpl }            from '../ports/index.js'
import { ProfileRepositoryImpl }       from '../repositories/index.js'
import { CompatibilityRepositoryImpl } from '../repositories/index.js'
import { SimilarityRepositoryImpl }    from '../repositories/index.js'
import { SkipRepositoryImpl }          from '../repositories/index.js'
import { LikeRepositoryImpl }          from '../repositories/index.js'

@Module({})
export class ProfilesInfrastructureModule {
  static register(): DynamicModule {
    return {
      global: true,
      module: ProfilesInfrastructureModule,
      controllers: Object.values(controllers),
      imports: [
        ValidationModule.register(),
        MikroOrmModule.forFeature(Object.values(entities)),
        ProfilesApplicationModule.register(),
      ],
      providers: [
        ...Object.values(mappers),
        {
          provide: ProfileRepository,
          useClass: ProfileRepositoryImpl,
        },
        {
          provide: CompatibilityRepository,
          useClass: CompatibilityRepositoryImpl,
        },
        {
          provide: SimilarityRepository,
          useClass: SimilarityRepositoryImpl,
        },
        {
          provide: SkipRepository,
          useClass: SkipRepositoryImpl,
        },
        {
          provide: LikeRepository,
          useClass: LikeRepositoryImpl,
        },
        {
          provide: GeocoderPort,
          useClass: GeocoderPortImpl,
        },
      ],
      exports: [
        {
          provide: ProfileRepository,
          useClass: ProfileRepositoryImpl,
        },
        {
          provide: CompatibilityRepository,
          useClass: CompatibilityRepositoryImpl,
        },
        {
          provide: SimilarityRepository,
          useClass: SimilarityRepositoryImpl,
        },
        {
          provide: SkipRepository,
          useClass: SkipRepositoryImpl,
        },
        {
          provide: LikeRepository,
          useClass: LikeRepositoryImpl,
        },
        {
          provide: GeocoderPort,
          useClass: GeocoderPortImpl,
        },
      ],
    }
  }
}

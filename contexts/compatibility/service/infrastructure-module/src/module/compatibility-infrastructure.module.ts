import type { DynamicModule }             from '@nestjs/common'

import { MikroOrmModule }                 from '@mikro-orm/nestjs'
import { ValidationModule }               from '@monstrs/nestjs-validation'
import { Module }                         from '@nestjs/common'

import { CompatibilityApplicationModule } from '@compatibility/application-module'
import { QuestionaireRepository }         from '@compatibility/application-module'
import { SurveyRepository }               from '@compatibility/application-module'

import * as controllers                   from '../controllers/index.js'
import * as entities                      from '../entities/index.js'
import * as mappers                       from '../mappers/index.js'
import { QuestionaireRepositoryImpl }     from '../repositories/index.js'
import { SurveyRepositoryImpl }           from '../repositories/index.js'

@Module({})
export class CompatibilityInfrastructureModule {
  static register(): DynamicModule {
    return {
      global: true,
      module: CompatibilityInfrastructureModule,
      controllers: Object.values(controllers),
      imports: [
        ValidationModule.register(),
        MikroOrmModule.forFeature(Object.values(entities)),
        CompatibilityApplicationModule.register(),
      ],
      providers: [
        ...Object.values(mappers),
        {
          provide: QuestionaireRepository,
          useClass: QuestionaireRepositoryImpl,
        },
        {
          provide: SurveyRepository,
          useClass: SurveyRepositoryImpl,
        },
      ],
      exports: [
        {
          provide: QuestionaireRepository,
          useClass: QuestionaireRepositoryImpl,
        },
        {
          provide: SurveyRepository,
          useClass: SurveyRepositoryImpl,
        },
      ],
    }
  }
}

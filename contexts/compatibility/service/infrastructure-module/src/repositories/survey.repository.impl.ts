/* eslint-disable @typescript-eslint/consistent-type-imports */

import type { FindSurveysByQueryResult }            from '@compatibility/application-module'
import type { FindSurveysByQuery }                  from '@compatibility/application-module'
import type { Survey }                              from '@compatibility/domain-module'

import { EntityRepository }                         from '@mikro-orm/core'
import { MikroORM }                                 from '@mikro-orm/core'
import { CreateRequestContext }                     from '@mikro-orm/core'
import { EntityManager }                            from '@mikro-orm/core'
import { InjectRepository }                         from '@mikro-orm/nestjs'
import { EntityManager as PostgreSqlEntityManager } from '@mikro-orm/postgresql'
import { MikroORMQueryBuilder }                     from '@monstrs/mikro-orm-query-builder'
import { Injectable }                               from '@nestjs/common'
import { Inject }                                   from '@nestjs/common'
import { EventBus }                                 from '@nestjs/cqrs'

import { SurveyRepository }                         from '@compatibility/application-module'

import { SurveyEntity }                             from '../entities/index.js'
import { SurveyMapper }                             from '../mappers/index.js'

@Injectable()
export class SurveyRepositoryImpl extends SurveyRepository {
  constructor(
    @InjectRepository(SurveyEntity)
    private readonly repository: EntityRepository<SurveyEntity>,
    @Inject(EntityManager)
    private readonly em: PostgreSqlEntityManager,
    private readonly mapper: SurveyMapper,
    private readonly eventBus: EventBus,
    // @ts-expect-error
    private readonly orm: MikroORM
  ) {
    super()
  }

  @CreateRequestContext()
  async save(aggregate: Survey): Promise<void> {
    const exists = (await this.repository.findOne(aggregate.id)) || new SurveyEntity()

    await this.em.persist(this.mapper.toPersistence(aggregate, exists)).flush()

    if (aggregate.getUncommittedEvents().length > 0) {
      this.eventBus.publishAll(aggregate.getUncommittedEvents())
    }

    aggregate.commit()
  }

  @CreateRequestContext()
  async findById(id: string): Promise<Survey | undefined> {
    const entity = await this.repository.findOne({
      id,
    })

    return entity ? this.mapper.toDomain(entity) : undefined
  }

  @CreateRequestContext()
  async findByQuery({
    pager,
    order,
    query,
    search,
  }: FindSurveysByQuery): Promise<FindSurveysByQueryResult> {
    const [surveys, hasNextPage] = await new MikroORMQueryBuilder<SurveyEntity>(
      this.em.createQueryBuilder(SurveyEntity)
    )
      .id('id', query?.id)
      .search(search?.fields, search?.value)
      .order(order)
      .pager(pager)
      .execute()

    return {
      surveys: surveys.map((survey) => this.mapper.toDomain(survey)),
      hasNextPage,
    }
  }
}

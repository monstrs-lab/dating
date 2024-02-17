/* eslint-disable @typescript-eslint/consistent-type-imports */

import type { Skip }                                from '@profiles/domain-module'

import { EntityRepository }                         from '@mikro-orm/core'
import { MikroORM }                                 from '@mikro-orm/core'
import { CreateRequestContext }                     from '@mikro-orm/core'
import { EntityManager }                            from '@mikro-orm/core'
import { InjectRepository }                         from '@mikro-orm/nestjs'
import { EntityManager as PostgreSqlEntityManager } from '@mikro-orm/postgresql'
import { Injectable }                               from '@nestjs/common'
import { Inject }                                   from '@nestjs/common'
import { EventBus }                                 from '@nestjs/cqrs'

import { SkipRepository }                           from '@profiles/application-module'

import { SkipEntity }                               from '../entities/index.js'
import { SkipMapper }                               from '../mappers/index.js'

@Injectable()
export class SkipRepositoryImpl extends SkipRepository {
  constructor(
    @InjectRepository(SkipEntity)
    private readonly repository: EntityRepository<SkipEntity>,
    @Inject(EntityManager)
    private readonly em: PostgreSqlEntityManager,
    private readonly mapper: SkipMapper,
    private readonly eventBus: EventBus,
    // @ts-expect-error
    private readonly orm: MikroORM
  ) {
    super()
  }

  @CreateRequestContext()
  async save(aggregate: Skip): Promise<void> {
    const exists = (await this.repository.findOne(aggregate.id)) || new SkipEntity()

    await this.em.persist(this.mapper.toPersistence(aggregate, exists)).flush()

    if (aggregate.getUncommittedEvents().length > 0) {
      this.eventBus.publishAll(aggregate.getUncommittedEvents())
    }

    aggregate.commit()
  }
}

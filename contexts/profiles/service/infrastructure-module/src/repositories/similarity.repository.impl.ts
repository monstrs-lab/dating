import type { Similarity }                          from '@profiles/domain-module'

import { EntityRepository }                         from '@mikro-orm/core'
import { MikroORM }                                 from '@mikro-orm/core'
import { CreateRequestContext }                     from '@mikro-orm/core'
import { EntityManager }                            from '@mikro-orm/core'
import { InjectRepository }                         from '@mikro-orm/nestjs'
import { EntityManager as PostgreSqlEntityManager } from '@mikro-orm/postgresql'
import { Injectable }                               from '@nestjs/common'
import { Inject }                                   from '@nestjs/common'
import { EventBus }                                 from '@nestjs/cqrs'

import { SimilarityRepository }                     from '@profiles/application-module'

import { SimilarityEntity }                         from '../entities/index.js'
import { SimilarityMapper }                         from '../mappers/index.js'

@Injectable()
export class SimilarityRepositoryImpl extends SimilarityRepository {
  constructor(
    @InjectRepository(SimilarityEntity)
    private readonly repository: EntityRepository<SimilarityEntity>,
    @Inject(EntityManager)
    private readonly em: PostgreSqlEntityManager,
    private readonly mapper: SimilarityMapper,
    private readonly eventBus: EventBus,
    // @ts-expect-error
    private readonly orm: MikroORM
  ) {
    super()
  }

  @CreateRequestContext()
  async saveMany(aggregates: Array<Similarity>): Promise<void> {
    aggregates.forEach((aggregate) => {
      this.em.persist(this.mapper.toPersistence(aggregate, new SimilarityEntity()))
    })

    await this.em.flush()

    this.eventBus.publishAll(aggregates.map((aggregate) => aggregate.getUncommittedEvents()).flat())

    aggregates.forEach((aggregate) => {
      aggregate.commit()
    })
  }

  @CreateRequestContext()
  async findById(id: string): Promise<Similarity | undefined> {
    const entity = await this.repository.findOne({
      id,
    })

    return entity ? this.mapper.toDomain(entity) : undefined
  }
}

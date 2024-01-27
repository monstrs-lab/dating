/* eslint-disable @typescript-eslint/consistent-type-imports */

import type { FindProfilesByQueryResult }           from '@profiles/application-module'
import type { FindProfilesByQuery }                 from '@profiles/application-module'
import type { Profile }                             from '@profiles/domain-module'

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

import { ProfileRepository }                        from '@profiles/application-module'

import { ProfileEntity }                            from '../entities/index.js'
import { ProfileMapper }                            from '../mappers/index.js'

@Injectable()
export class ProfileRepositoryImpl extends ProfileRepository {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly repository: EntityRepository<ProfileEntity>,
    @Inject(EntityManager)
    private readonly em: PostgreSqlEntityManager,
    private readonly mapper: ProfileMapper,
    private readonly eventBus: EventBus,
    // @ts-expect-error
    private readonly orm: MikroORM
  ) {
    super()
  }

  @CreateRequestContext()
  async save(aggregate: Profile): Promise<void> {
    const exists = (await this.repository.findOne(aggregate.id)) || new ProfileEntity()

    await this.em.persist(this.mapper.toPersistence(aggregate, exists)).flush()

    if (aggregate.getUncommittedEvents().length > 0) {
      this.eventBus.publishAll(aggregate.getUncommittedEvents())
    }

    aggregate.commit()
  }

  @CreateRequestContext()
  async findById(id: string): Promise<Profile | undefined> {
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
  }: FindProfilesByQuery): Promise<FindProfilesByQueryResult> {
    const [profiles, hasNextPage] = await new MikroORMQueryBuilder<ProfileEntity>(
      this.em.createQueryBuilder(ProfileEntity)
    )
      .id('id', query?.id)
      .search(search?.fields, search?.value)
      .order(order)
      .pager(pager)
      .execute()

    return {
      profiles: profiles.map((profile) => this.mapper.toDomain(profile)),
      hasNextPage,
    }
  }
}

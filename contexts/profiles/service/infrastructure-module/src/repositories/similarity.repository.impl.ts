import type { EntityDictionary }                    from '@mikro-orm/core'
import type { Knex }                                from '@mikro-orm/postgresql'
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
import { Profile }                                  from '@profiles/domain-module'

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

  @CreateRequestContext()
  async findByProfile(profile: Profile): Promise<{
    similarities: Array<Similarity>
    hasNextPage: boolean
  }> {
    const results: Array<EntityDictionary<SimilarityEntity>> = await this.em
      .getKnex()
      .select('similarities.*')
      .from('similarities')
      .leftJoin('skips', (builder: Knex.JoinClause) => {
        builder.on('skips.target_id', '=', 'similarities.from_id')
        builder.orOn('skips.target_id', '=', 'similarities.to_id')
      })
      .leftJoin('likes', (builder: Knex.JoinClause) => {
        builder.on('likes.target_id', '=', 'similarities.from_id')
        builder.orOn('likes.target_id', '=', 'similarities.to_id')
      })
      .whereRaw('skips.id is null')
      .whereRaw('likes.id is null')
      .andWhereRaw(`(similarities.from_id = ? or similarities.to_id = ?)`, [profile.id, profile.id])
      .orderBy('similarities.value', 'desc')
      .offset(0)
      .limit(51)

    const { unique }: { unique: Array<EntityDictionary<SimilarityEntity>> } = results.reduce(
      (
        result: { keys: Array<string>; unique: Array<EntityDictionary<SimilarityEntity>> },
        item
      ) => {
        const profileId: string = item.from_id === profile.id ? item.to_id : item.from_id

        if (result.keys.includes(profileId)) {
          return result
        }

        return {
          keys: [...result.keys, profileId],
          unique: [...result.unique, item],
        }
      },
      { keys: [], unique: [] }
    )

    return {
      hasNextPage: results.length > 50,
      similarities: unique.map((result) =>
        this.mapper.toDomain(this.em.map(SimilarityEntity, result))),
    }
  }
}

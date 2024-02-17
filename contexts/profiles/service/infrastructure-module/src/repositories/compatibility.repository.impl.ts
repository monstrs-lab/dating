/* eslint-disable @typescript-eslint/consistent-type-imports */

import type { Compatibility }                       from '@profiles/domain-module'
import type { Profile }                             from '@profiles/domain-module'

import { EntityRepository }                         from '@mikro-orm/core'
import { MikroORM }                                 from '@mikro-orm/core'
import { CreateRequestContext }                     from '@mikro-orm/core'
import { EntityManager }                            from '@mikro-orm/core'
import { InjectRepository }                         from '@mikro-orm/nestjs'
import { EntityManager as PostgreSqlEntityManager } from '@mikro-orm/postgresql'
import { Injectable }                               from '@nestjs/common'
import { Inject }                                   from '@nestjs/common'
import { EventBus }                                 from '@nestjs/cqrs'

import { CompatibilityRepository }                  from '@profiles/application-module'
import { ProfileGender }                            from '@profiles/domain-module'

import { CompatibilityEntity }                      from '../entities/index.js'
import { CompatibilityMapper }                      from '../mappers/index.js'

@Injectable()
export class CompatibilityRepositoryImpl extends CompatibilityRepository {
  constructor(
    @InjectRepository(CompatibilityEntity)
    private readonly repository: EntityRepository<CompatibilityEntity>,
    @Inject(EntityManager)
    private readonly em: PostgreSqlEntityManager,
    private readonly mapper: CompatibilityMapper,
    private readonly eventBus: EventBus,
    // @ts-expect-error
    private readonly orm: MikroORM
  ) {
    super()
  }

  @CreateRequestContext()
  async save(aggregate: Compatibility): Promise<void> {
    const exists = (await this.repository.findOne(aggregate.id)) || new CompatibilityEntity()

    await this.em.persist(this.mapper.toPersistence(aggregate, exists)).flush()

    if (aggregate.getUncommittedEvents().length > 0) {
      this.eventBus.publishAll(aggregate.getUncommittedEvents())
    }

    aggregate.commit()
  }

  @CreateRequestContext()
  async findById(id: string): Promise<Compatibility | undefined> {
    const entity = await this.repository.findOne({
      id,
    })

    return entity ? this.mapper.toDomain(entity) : undefined
  }

  @CreateRequestContext()
  async findSimilar(compatibility: Compatibility, profile: Profile): Promise<Array<Compatibility>> {
    const qb = this.em
      .createQueryBuilder(CompatibilityEntity, 'compatibility')
      .leftJoinAndSelect('compatibility.interviewee', 'interviewee')
      .andWhere({
        'interviewee.gender':
          profile.gender === ProfileGender.MALE ? ProfileGender.FEMALE : ProfileGender.MALE,
      })
      .andWhere({ questionaireId: compatibility.questionaireId })

    const compatibilities = await qb.getResultList()

    return compatibilities.map((cm) => this.mapper.toDomain(cm))
  }
}

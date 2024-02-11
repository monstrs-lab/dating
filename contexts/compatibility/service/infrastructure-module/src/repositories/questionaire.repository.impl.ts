/* eslint-disable @typescript-eslint/consistent-type-imports */

import type { FindQuestionairesByQueryResult }      from '@compatibility/application-module'
import type { FindQuestionairesByQuery }            from '@compatibility/application-module'
import type { Questionaire }                        from '@compatibility/domain-module'

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

import { QuestionaireRepository }                   from '@compatibility/application-module'

import { QuestionaireEntity }                       from '../entities/index.js'
import { QuestionaireMapper }                       from '../mappers/index.js'

@Injectable()
export class QuestionaireRepositoryImpl extends QuestionaireRepository {
  constructor(
    @InjectRepository(QuestionaireEntity)
    private readonly repository: EntityRepository<QuestionaireEntity>,
    @Inject(EntityManager)
    private readonly em: PostgreSqlEntityManager,
    private readonly mapper: QuestionaireMapper,
    private readonly eventBus: EventBus,
    // @ts-expect-error
    private readonly orm: MikroORM
  ) {
    super()
  }

  @CreateRequestContext()
  async save(aggregate: Questionaire): Promise<void> {
    const exists = (await this.repository.findOne(aggregate.id)) || new QuestionaireEntity()

    await this.em.persist(this.mapper.toPersistence(aggregate, exists)).flush()

    if (aggregate.getUncommittedEvents().length > 0) {
      this.eventBus.publishAll(aggregate.getUncommittedEvents())
    }

    aggregate.commit()
  }

  @CreateRequestContext()
  async findById(id: string): Promise<Questionaire | undefined> {
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
  }: FindQuestionairesByQuery): Promise<FindQuestionairesByQueryResult> {
    const [questionaires, hasNextPage] = await new MikroORMQueryBuilder<QuestionaireEntity>(
      this.em.createQueryBuilder(QuestionaireEntity)
    )
      .id('id', query?.id)
      .search(search?.fields, search?.value)
      .order(order)
      .pager(pager)
      .execute()

    return {
      questionaires: questionaires.map((questionaire) => this.mapper.toDomain(questionaire)),
      hasNextPage,
    }
  }
}

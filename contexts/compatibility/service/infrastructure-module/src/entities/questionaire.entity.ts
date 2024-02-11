import { Entity }             from '@mikro-orm/core'
import { Property }           from '@mikro-orm/core'
import { Enum }               from '@mikro-orm/core'
import { PrimaryKey }         from '@mikro-orm/core'

import { QuestionaireStatus } from '@compatibility/domain-module'

@Entity({ tableName: 'questionaires' })
export class QuestionaireEntity {
  @PrimaryKey({ type: 'uuid' })
  id!: string

  @Enum({ items: () => QuestionaireStatus, type: 'smallint', default: QuestionaireStatus.INACTIVE })
  status: QuestionaireStatus = QuestionaireStatus.INACTIVE

  @Property()
  name!: string

  @Property({ type: 'uuid', nullable: true })
  photoId?: string

  @Property({ type: 'jsonb', default: '[]' })
  questions: Array<{ id: string; content: string }> = []

  @Property({ type: 'timestamptz' })
  createdAt!: Date
}

import { Entity }       from '@mikro-orm/core'
import { Property }     from '@mikro-orm/core'
import { Enum }         from '@mikro-orm/core'
import { PrimaryKey }   from '@mikro-orm/core'
import { Unique }       from '@mikro-orm/core'

import { SurveyStatus } from '@compatibility/domain-module'

@Entity({ tableName: 'surveys' })
@Unique({ properties: ['questionaireId', 'intervieweeId'] })
export class SurveyEntity {
  @PrimaryKey({ type: 'uuid' })
  id!: string

  @Enum({ items: () => SurveyStatus, type: 'smallint', default: SurveyStatus.STARTED })
  status: SurveyStatus = SurveyStatus.STARTED

  @Property({ type: 'uuid' })
  questionaireId!: string

  @Property({ type: 'uuid' })
  intervieweeId!: string

  @Property({ type: 'jsonb', default: '{}' })
  answers: Record<string, number | undefined> = {}

  @Property({ type: 'timestamptz' })
  createdAt!: Date
}

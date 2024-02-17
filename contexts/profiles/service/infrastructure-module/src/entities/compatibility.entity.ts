import { Entity }        from '@mikro-orm/core'
import { Property }      from '@mikro-orm/core'
import { PrimaryKey }    from '@mikro-orm/core'
import { ManyToOne }     from '@mikro-orm/core'

import { ProfileEntity } from './profile.entity.js'

@Entity({ tableName: 'compatibilities' })
export class CompatibilityEntity {
  @PrimaryKey({ type: 'uuid' })
  id!: string

  @Property({ type: 'uuid' })
  questionaireId!: string

  @ManyToOne()
  interviewee!: ProfileEntity

  @Property({ type: 'jsonb', default: '{}' })
  answers!: Record<string, number>

  @Property({ type: 'float' })
  mean!: number

  @Property({ type: 'timestamptz' })
  createdAt!: Date
}

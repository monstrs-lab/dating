import { Entity }        from '@mikro-orm/core'
import { Property }      from '@mikro-orm/core'
import { PrimaryKey }    from '@mikro-orm/core'
import { ManyToOne }     from '@mikro-orm/core'

import { ProfileEntity } from './profile.entity.js'

@Entity({ tableName: 'similarities' })
export class SimilarityEntity {
  @PrimaryKey({ type: 'uuid' })
  id!: string

  @Property({ type: 'uuid' })
  compatibilityId!: string

  @ManyToOne()
  from!: ProfileEntity

  @ManyToOne()
  to!: ProfileEntity

  @Property({ type: 'float' })
  value!: number

  @Property({ type: 'timestamptz' })
  createdAt!: Date
}

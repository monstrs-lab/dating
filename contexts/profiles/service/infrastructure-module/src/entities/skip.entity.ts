import { Entity }        from '@mikro-orm/core'
import { Property }      from '@mikro-orm/core'
import { PrimaryKey }    from '@mikro-orm/core'
import { ManyToOne }     from '@mikro-orm/core'

import { ProfileEntity } from './profile.entity.js'

@Entity({ tableName: 'skips' })
export class SkipEntity {
  @PrimaryKey({ type: 'uuid' })
  id!: string

  @ManyToOne()
  profile!: ProfileEntity

  @ManyToOne()
  target!: ProfileEntity

  @Property({ type: 'timestamptz' })
  createdAt!: Date
}

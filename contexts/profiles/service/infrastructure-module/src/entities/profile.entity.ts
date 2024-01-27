import { Entity }        from '@mikro-orm/core'
import { Property }      from '@mikro-orm/core'
import { Enum }          from '@mikro-orm/core'
import { PrimaryKey }    from '@mikro-orm/core'

import { ProfileGender } from '@profiles/domain-module'

@Entity({ tableName: 'profiles' })
export class ProfileEntity {
  @PrimaryKey({ type: 'uuid' })
  id!: string

  @Enum({ items: () => ProfileGender, type: 'smallint', nullable: true })
  gender?: ProfileGender

  @Property({ nullable: true })
  name?: string

  @Property({ type: 'timestamptz' })
  createdAt!: Date
}

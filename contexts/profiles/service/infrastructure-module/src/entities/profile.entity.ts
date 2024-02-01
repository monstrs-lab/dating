import { Entity }        from '@mikro-orm/core'
import { Property }      from '@mikro-orm/core'
import { Enum }          from '@mikro-orm/core'
import { PrimaryKey }    from '@mikro-orm/core'

import { ProfileGender } from '@profiles/domain-module'

import { PointType }     from '../types/index.js'
import { Point }         from '../types/index.js'

@Entity({ tableName: 'profiles' })
export class ProfileEntity {
  @PrimaryKey({ type: 'uuid' })
  id!: string

  @Enum({ items: () => ProfileGender, type: 'smallint', nullable: true })
  gender?: ProfileGender

  @Property({ nullable: true })
  name?: string

  @Property({ nullable: true })
  location?: string

  @Property({ type: PointType, nullable: true })
  geoposition?: Point

  @Property({ type: 'jsonb', default: '[]' })
  photos: Array<string> = []

  @Property({ type: 'timestamptz' })
  createdAt!: Date
}

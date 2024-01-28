import { Entity }                           from '@mikro-orm/core'
import { Property }                         from '@mikro-orm/core'
import { Enum }                             from '@mikro-orm/core'
import { Embedded }                         from '@mikro-orm/core'
import { PrimaryKey }                       from '@mikro-orm/core'

import { ProfileGender }                    from '@profiles/domain-module'

import { ProfileGeopositionEmbeddedEntity } from '../embedded-entities/index.js'

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

  @Embedded(() => ProfileGeopositionEmbeddedEntity, { nullable: true })
  geoposition?: ProfileGeopositionEmbeddedEntity

  @Property({ type: 'timestamptz' })
  createdAt!: Date
}

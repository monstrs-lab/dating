import { Embeddable } from '@mikro-orm/core'
import { Property }   from '@mikro-orm/core'

@Embeddable()
export class ProfileGeopositionEmbeddedEntity {
  @Property()
  latitude!: number

  @Property()
  longitude!: number
}

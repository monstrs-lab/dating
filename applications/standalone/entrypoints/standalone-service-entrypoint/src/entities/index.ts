import { entities as compatibility } from '@compatibility/infrastructure-module'
import { entities as profiles }      from '@profiles/infrastructure-module'

export const entities = {
  ...compatibility,
  ...profiles,
}

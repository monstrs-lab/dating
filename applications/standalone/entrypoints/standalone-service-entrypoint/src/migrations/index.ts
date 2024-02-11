import { migrations as compatibility } from '@compatibility/infrastructure-module'
import { migrations as profiles }      from '@profiles/infrastructure-module'

export const migrations = {
  ...compatibility,
  ...profiles,
}

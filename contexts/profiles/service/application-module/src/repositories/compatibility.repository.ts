import type { Compatibility } from '@profiles/domain-module'
import type { Profile }       from '@profiles/domain-module'

export abstract class CompatibilityRepository {
  abstract save(aggregate: Compatibility): Promise<void>

  abstract findById(id: string): Promise<Compatibility | undefined>

  abstract findSimilar(
    compatibility: Compatibility,
    profile: Profile
  ): Promise<Array<Compatibility>>
}

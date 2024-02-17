import type { Skip } from '@profiles/domain-module'

export abstract class SkipRepository {
  abstract save(aggregate: Skip): Promise<void>
}

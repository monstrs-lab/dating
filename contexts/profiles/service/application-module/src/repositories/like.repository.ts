import type { Like } from '@profiles/domain-module'

export abstract class LikeRepository {
  abstract save(aggregate: Like): Promise<void>
}

import type { Profile }       from '@profiles/domain-module'
import type { Similarity }    from '@profiles/domain-module'

import { GetMatchesResponse } from '@profiles/profiles-rpc/abstractions'

import { MatchSerializer }    from './match.serializer.js'

export class GetMatchesSerializer extends GetMatchesResponse {
  constructor(
    private readonly query: {
      matches: Array<{ profile: Profile; similarity?: Similarity }>
      hasNextPage: boolean
    }
  ) {
    super()
  }

  get matches(): Array<MatchSerializer> {
    return this.query.matches.map((match) => new MatchSerializer(match))
  }

  get hasNextPage(): boolean {
    return this.query.hasNextPage
  }
}

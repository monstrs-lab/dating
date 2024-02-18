import type { Profile }         from '@profiles/domain-module'
import type { Similarity }      from '@profiles/domain-module'

import * as rpc                 from '@profiles/profiles-rpc/abstractions'

import { ProfileSerializer }    from './profile.serializer.js'
import { SimilaritySerializer } from './similarity.serializer.js'

export class MatchSerializer extends rpc.Match {
  constructor(private readonly match: { profile: Profile; similarity?: Similarity }) {
    super()
  }

  get profile(): ProfileSerializer {
    return new ProfileSerializer(this.match.profile)
  }

  get similarity(): SimilaritySerializer | undefined {
    return this.match.similarity ? new SimilaritySerializer(this.match.similarity) : undefined
  }
}

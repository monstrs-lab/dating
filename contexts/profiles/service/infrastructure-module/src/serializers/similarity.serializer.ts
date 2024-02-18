import type { Similarity } from '@profiles/domain-module'

import * as rpc            from '@profiles/profiles-rpc/abstractions'

export class SimilaritySerializer extends rpc.Similarity {
  constructor(private readonly similarity: Similarity) {
    super()
  }

  get id(): string {
    return this.similarity.id
  }

  get value(): number {
    return this.similarity.value
  }
}

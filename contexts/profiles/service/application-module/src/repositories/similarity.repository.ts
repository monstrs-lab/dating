import type { Similarity } from '@profiles/domain-module'
import type { Profile }    from '@profiles/domain-module'

export abstract class SimilarityRepository {
  abstract saveMany(aggregates: Array<Similarity>): Promise<void>

  abstract findById(id: string): Promise<Similarity | undefined>

  abstract findByProfile(profile: Profile): Promise<{
    similarities: Array<Similarity>
    hasNextPage: boolean
  }>
}

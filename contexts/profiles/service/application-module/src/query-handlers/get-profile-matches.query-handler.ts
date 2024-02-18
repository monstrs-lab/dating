import type { IQueryHandler }     from '@nestjs/cqrs'
import type { Profile }           from '@profiles/domain-module'
import type { Similarity }        from '@profiles/domain-module'

import { QueryHandler }           from '@nestjs/cqrs'

import { GetProfileMatchesQuery } from '../queries/index.js'
import { ProfileRepository }      from '../repositories/index.js'
import { SimilarityRepository }   from '../repositories/index.js'

@QueryHandler(GetProfileMatchesQuery)
export class GetProfileMatchesQueryHandler implements IQueryHandler<GetProfileMatchesQuery> {
  constructor(
    private readonly similarityRepository: SimilarityRepository,
    private readonly profileRepository: ProfileRepository
  ) {}

  async execute(query: GetProfileMatchesQuery): Promise<{
    matches: Array<{ profile: Profile; similarity?: Similarity }>
    hasNextPage: boolean
  }> {
    const profile = await this.profileRepository.findById(query.profileId)

    const { similarities, hasNextPage } = await this.similarityRepository.findByProfile(profile!)

    const { profiles } = await this.profileRepository.findByQuery({
      query: {
        id: {
          conditions: {
            in: {
              values: Array.from(
                new Set(
                  similarities
                    .map((similarity) => [similarity.fromId, similarity.toId])
                    .flat()
                    .filter((id) => id !== profile!.id)
                )
              ),
            },
          },
        },
      },
    })

    return {
      matches: similarities.map((similarity) => {
        const profileId = similarity.fromId === profile!.id ? similarity.toId : similarity.fromId

        return {
          profile: profiles.find((p) => p.id === profileId)!,
          similarity,
        }
      }),
      hasNextPage,
    }
  }
}

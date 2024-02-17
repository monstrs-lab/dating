import type { CompatibilityQueueData } from '../queues/index.js'

import { Processor }                   from '@nestjs/bull'
import { Process }                     from '@nestjs/bull'
import { Job }                         from 'bull'

import { Similarity }                  from '@profiles/domain-module'

import { COMPATIBILITY_QUEUE }         from '../queues/index.js'
import { CompatibilityRepository }     from '../repositories/index.js'
import { ProfileRepository }           from '../repositories/index.js'
import { SimilarityRepository }        from '../repositories/index.js'

@Processor(COMPATIBILITY_QUEUE)
export class CompatibilityProcessor {
  constructor(
    private readonly compatibilityRepository: CompatibilityRepository,
    private readonly similarityRepository: SimilarityRepository,
    private readonly profileRepository: ProfileRepository
  ) {}

  @Process()
  async process(job: Job<CompatibilityQueueData>): Promise<void> {
    const compatibility = await this.compatibilityRepository.findById(job.data.compatibilityId)
    const profile = await this.profileRepository.findById(compatibility!.intervieweeId)

    const compatibilities = await this.compatibilityRepository.findSimilar(compatibility!, profile!)

    const similarities = compatibilities.map((to) =>
      new Similarity().calculate(compatibility!.questionaireId, compatibility!, to))

    await this.similarityRepository.saveMany(similarities)
  }
}

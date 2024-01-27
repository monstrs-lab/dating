import type { IQueryHandler }  from '@nestjs/cqrs'
import type { Profile }        from '@profiles/domain-module'

import { QueryHandler }        from '@nestjs/cqrs'

import { GetProfileByIdQuery } from '../queries/index.js'
import { ProfileRepository }   from '../repositories/index.js'

@QueryHandler(GetProfileByIdQuery)
export class GetProfileQueryHandler implements IQueryHandler<GetProfileByIdQuery> {
  constructor(private readonly profilesRepository: ProfileRepository) {}

  async execute(query: GetProfileByIdQuery): Promise<Profile | undefined> {
    return this.profilesRepository.findById(query.id)
  }
}

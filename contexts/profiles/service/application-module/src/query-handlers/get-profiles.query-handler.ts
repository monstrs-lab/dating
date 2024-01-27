import type { IQueryHandler }             from '@nestjs/cqrs'

import type { FindProfilesByQueryResult } from '../repositories/index.js'

import { QueryHandler }                   from '@nestjs/cqrs'

import { GetProfilesQuery }               from '../queries/index.js'
import { ProfileRepository }              from '../repositories/index.js'

@QueryHandler(GetProfilesQuery)
export class GetProfilesQueryHandler implements IQueryHandler<GetProfilesQuery> {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async execute({
    pager,
    order,
    query,
    search,
  }: GetProfilesQuery): Promise<FindProfilesByQueryResult> {
    return this.profileRepository.findByQuery({
      pager,
      order,
      query,
      search,
    })
  }
}

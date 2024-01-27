import type { Query }   from '@monstrs/query-types'
import type { Profile } from '@profiles/domain-module'

export interface ProfilesQuery {
  id?: Query.IDType
}

export interface FindProfilesByQuery {
  pager?: Query.Pager
  order?: Query.Order
  search?: Query.Search
  query?: ProfilesQuery
}

export interface FindProfilesByQueryResult {
  profiles: Array<Profile>
  hasNextPage: boolean
}

export abstract class ProfileRepository {
  abstract save(aggregate: Profile): Promise<void>

  abstract findById(id: string): Promise<Profile | undefined>

  abstract findByQuery(query: FindProfilesByQuery): Promise<FindProfilesByQueryResult>
}

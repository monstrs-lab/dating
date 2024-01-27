import type { FindProfilesByQuery } from '../repositories/index.js'

export class GetProfilesQuery {
  constructor(
    public readonly pager: FindProfilesByQuery['pager'],
    public readonly order?: FindProfilesByQuery['order'],
    public readonly query?: FindProfilesByQuery['query'],
    public readonly search?: FindProfilesByQuery['search']
  ) {}
}

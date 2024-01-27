/* eslint-disable max-classes-per-file */

import type { ListProfilesRequest_ProfilesQuery } from '@profiles/profiles-rpc/interfaces'
import type { ListProfilesRequest }               from '@profiles/profiles-rpc/interfaces'

import { IdQueryPayload }                         from '@monstrs/rpc-query-payloads'
import { OrderPayload }                           from '@monstrs/rpc-query-payloads'
import { PagerPayload }                           from '@monstrs/rpc-query-payloads'
import { SearchPayload }                          from '@monstrs/rpc-query-payloads'
import { IsOptional }                             from 'class-validator'
import { ValidateNested }                         from 'class-validator'

export class ListProfilesQueryPayload {
  constructor(private readonly query: ListProfilesRequest_ProfilesQuery) {}

  @IsOptional()
  @ValidateNested()
  get id(): IdQueryPayload {
    return new IdQueryPayload(this.query.id)
  }
}

export class ListProfilesPayload {
  constructor(private readonly request: ListProfilesRequest) {}

  @IsOptional()
  @ValidateNested()
  get pager(): PagerPayload | undefined {
    return this.request.pager ? new PagerPayload(this.request.pager) : undefined
  }

  @IsOptional()
  @ValidateNested()
  get order(): OrderPayload | undefined {
    return this.request.order ? new OrderPayload(this.request.order) : undefined
  }

  @IsOptional()
  @ValidateNested()
  get search(): SearchPayload | undefined {
    return this.request.search ? new SearchPayload(this.request.search) : undefined
  }

  @IsOptional()
  @ValidateNested()
  get query(): ListProfilesQueryPayload | undefined {
    return this.request.query ? new ListProfilesQueryPayload(this.request.query) : undefined
  }
}

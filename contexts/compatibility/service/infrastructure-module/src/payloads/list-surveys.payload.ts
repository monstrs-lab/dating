/* eslint-disable max-classes-per-file */

import type { ListSurveysRequest_SurveysQuery } from '@compatibility/compatibility-rpc/interfaces'
import type { ListSurveysRequest }              from '@compatibility/compatibility-rpc/interfaces'

import { IdQueryPayload }                       from '@monstrs/rpc-query-payloads'
import { IntQueryPayload }                      from '@monstrs/rpc-query-payloads'
import { OrderPayload }                         from '@monstrs/rpc-query-payloads'
import { PagerPayload }                         from '@monstrs/rpc-query-payloads'
import { SearchPayload }                        from '@monstrs/rpc-query-payloads'
import { IsOptional }                           from 'class-validator'
import { ValidateNested }                       from 'class-validator'

export class ListSurveysQueryPayload {
  constructor(private readonly query: ListSurveysRequest_SurveysQuery) {}

  @IsOptional()
  @ValidateNested()
  get id(): IdQueryPayload {
    return new IdQueryPayload(this.query.id)
  }

  @IsOptional()
  @ValidateNested()
  get status(): IntQueryPayload {
    return new IntQueryPayload(this.query.status)
  }

  @IsOptional()
  @ValidateNested()
  get intervieweeId(): IdQueryPayload {
    return new IdQueryPayload(this.query.intervieweeId)
  }

  @IsOptional()
  @ValidateNested()
  get questionaireId(): IdQueryPayload {
    return new IdQueryPayload(this.query.questionaireId)
  }
}

export class ListSurveysPayload {
  constructor(private readonly request: ListSurveysRequest) {}

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
  get query(): ListSurveysQueryPayload | undefined {
    return this.request.query ? new ListSurveysQueryPayload(this.request.query) : undefined
  }
}

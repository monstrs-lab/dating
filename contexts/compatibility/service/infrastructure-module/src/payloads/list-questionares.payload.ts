/* eslint-disable max-classes-per-file */

import type { ListQuestionairesRequest_QuestionairesQuery } from '@compatibility/compatibility-rpc/interfaces'
import type { ListQuestionairesRequest }                    from '@compatibility/compatibility-rpc/interfaces'

import { IdQueryPayload }                                   from '@monstrs/rpc-query-payloads'
import { IntQueryPayload }                                  from '@monstrs/rpc-query-payloads'
import { OrderPayload }                                     from '@monstrs/rpc-query-payloads'
import { PagerPayload }                                     from '@monstrs/rpc-query-payloads'
import { SearchPayload }                                    from '@monstrs/rpc-query-payloads'
import { IsOptional }                                       from 'class-validator'
import { ValidateNested }                                   from 'class-validator'

export class ListQuestionairesQueryPayload {
  constructor(private readonly query: ListQuestionairesRequest_QuestionairesQuery) {}

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
}

export class ListQuestionairesPayload {
  constructor(private readonly request: ListQuestionairesRequest) {}

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
  get query(): ListQuestionairesQueryPayload | undefined {
    return this.request.query ? new ListQuestionairesQueryPayload(this.request.query) : undefined
  }
}

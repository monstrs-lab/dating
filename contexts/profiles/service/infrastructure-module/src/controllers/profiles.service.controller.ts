/* eslint-disable @typescript-eslint/consistent-type-imports */

import type { ServiceImpl }                 from '@connectrpc/connect'
import type { FindProfilesByQueryResult }   from '@profiles/application-module'
import type { Profile }                     from '@profiles/domain-module'
import type { ListProfilesRequest }         from '@profiles/profiles-rpc/interfaces'
import type { SelectProfileGenderRequest }  from '@profiles/profiles-rpc/interfaces'
import type { ChangeProfileNameRequest }    from '@profiles/profiles-rpc/interfaces'
import type { ListProfilesResponse }        from '@profiles/profiles-rpc/interfaces'
import type { SelectProfileGenderResponse } from '@profiles/profiles-rpc/interfaces'
import type { ChangeProfileNameResponse }   from '@profiles/profiles-rpc/interfaces'

import { ConnectRpcMethod }                 from '@monstrs/nestjs-connectrpc'
import { ConnectRpcService }                from '@monstrs/nestjs-connectrpc'
import { ConnectRpcExceptionsFilter }       from '@monstrs/nestjs-connectrpc-errors'
import { Validator }                        from '@monstrs/nestjs-validation'
import { UseFilters }                       from '@nestjs/common'
import { Controller }                       from '@nestjs/common'
import { QueryBus }                         from '@nestjs/cqrs'
import { CommandBus }                       from '@nestjs/cqrs'

import { GetProfilesQuery }                 from '@profiles/application-module'
import { GetProfileByIdQuery }              from '@profiles/application-module'
import { SelectProfileGenderCommand }       from '@profiles/application-module'
import { ChangeProfileNameCommand }         from '@profiles/application-module'
import { ProfilesService }                  from '@profiles/profiles-rpc/connect'

import { ListProfilesPayload }              from '../payloads/index.js'
import { SelectProfileGenderPayload }       from '../payloads/index.js'
import { ChangeProfileNamePayload }         from '../payloads/index.js'
import { ListProfilesSerializer }           from '../serializers/index.js'
import { SelectProfileGenderSerializer }    from '../serializers/index.js'
import { ChangeProfileNameSerializer }      from '../serializers/index.js'

@Controller()
@ConnectRpcService(ProfilesService)
@UseFilters(ConnectRpcExceptionsFilter)
export class ProfilesController implements ServiceImpl<typeof ProfilesService> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly validator: Validator
  ) {}

  @ConnectRpcMethod()
  async listProfiles(request: ListProfilesRequest): Promise<ListProfilesResponse> {
    const payload = new ListProfilesPayload(request)

    await this.validator.validate(payload)

    return new ListProfilesSerializer(
      await this.queryBus.execute<GetProfilesQuery, FindProfilesByQueryResult>(
        new GetProfilesQuery(payload.pager, payload.order, payload.query, payload.search)
      )
    )
  }

  @ConnectRpcMethod()
  async selectProfileGender(
    request: SelectProfileGenderRequest
  ): Promise<SelectProfileGenderResponse> {
    const payload = new SelectProfileGenderPayload(request)

    await this.validator.validate(payload)

    await this.commandBus.execute(new SelectProfileGenderCommand(payload.profileId, payload.gender))

    return new SelectProfileGenderSerializer(
      await this.queryBus.execute<GetProfileByIdQuery, Profile>(
        new GetProfileByIdQuery(payload.profileId)
      )
    )
  }

  @ConnectRpcMethod()
  async changeProfileName(request: ChangeProfileNameRequest): Promise<ChangeProfileNameResponse> {
    const payload = new ChangeProfileNamePayload(request)

    await this.validator.validate(payload)

    await this.commandBus.execute(new ChangeProfileNameCommand(payload.profileId, payload.name))

    return new ChangeProfileNameSerializer(
      await this.queryBus.execute<GetProfileByIdQuery, Profile>(
        new GetProfileByIdQuery(payload.profileId)
      )
    )
  }
}

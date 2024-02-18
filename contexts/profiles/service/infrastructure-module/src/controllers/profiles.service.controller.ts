/* eslint-disable @typescript-eslint/consistent-type-imports */

import type { ServiceImpl }                    from '@connectrpc/connect'
import type { FindProfilesByQueryResult }      from '@profiles/application-module'
import type { Profile }                        from '@profiles/domain-module'
import type { Similarity }                     from '@profiles/domain-module'
import type { ListProfilesRequest }            from '@profiles/profiles-rpc/interfaces'
import type { GetMatchesRequest }              from '@profiles/profiles-rpc/interfaces'
import type { FillProfileGenderRequest }       from '@profiles/profiles-rpc/interfaces'
import type { SkipProfileRequest }             from '@profiles/profiles-rpc/interfaces'
import type { LikeProfileRequest }             from '@profiles/profiles-rpc/interfaces'
import type { AddProfilePhotoRequest }         from '@profiles/profiles-rpc/interfaces'
import type { FillProfileGeopositionRequest }  from '@profiles/profiles-rpc/interfaces'
import type { FillProfileNameRequest }         from '@profiles/profiles-rpc/interfaces'
import type { ListProfilesResponse }           from '@profiles/profiles-rpc/interfaces'
import type { FillProfileGenderResponse }      from '@profiles/profiles-rpc/interfaces'
import type { GetMatchesResponse }             from '@profiles/profiles-rpc/interfaces'
import type { AddProfilePhotoResponse }        from '@profiles/profiles-rpc/interfaces'
import type { FillProfileNameResponse }        from '@profiles/profiles-rpc/interfaces'
import type { SkipProfileResponse }            from '@profiles/profiles-rpc/interfaces'
import type { LikeProfileResponse }            from '@profiles/profiles-rpc/interfaces'
import type { FillProfileGeopositionResponse } from '@profiles/profiles-rpc/interfaces'

import { ConnectRpcMethod }                    from '@monstrs/nestjs-connectrpc'
import { ConnectRpcService }                   from '@monstrs/nestjs-connectrpc'
import { ConnectRpcExceptionsFilter }          from '@monstrs/nestjs-connectrpc-errors'
import { Validator }                           from '@monstrs/nestjs-validation'
import { UseFilters }                          from '@nestjs/common'
import { Controller }                          from '@nestjs/common'
import { QueryBus }                            from '@nestjs/cqrs'
import { CommandBus }                          from '@nestjs/cqrs'

import { GetProfilesQuery }                    from '@profiles/application-module'
import { GetProfileMatchesQuery }              from '@profiles/application-module'
import { SkipProfileCommand }                  from '@profiles/application-module'
import { LikeProfileCommand }                  from '@profiles/application-module'
import { GetProfileByIdQuery }                 from '@profiles/application-module'
import { FillProfileGenderCommand }            from '@profiles/application-module'
import { AddProfilePhotosCommand }             from '@profiles/application-module'
import { FillProfileNameCommand }              from '@profiles/application-module'
import { FillProfileGeopositionCommand }       from '@profiles/application-module'
import { ProfilesService }                     from '@profiles/profiles-rpc/connect'

import { ListProfilesPayload }                 from '../payloads/index.js'
import { GetMatchesPayload }                   from '../payloads/index.js'
import { SkipProfilePayload }                  from '../payloads/index.js'
import { LikeProfilePayload }                  from '../payloads/index.js'
import { FillProfileGenderPayload }            from '../payloads/index.js'
import { AddProfilePhotoPayload }              from '../payloads/index.js'
import { FillProfileGeopositionPayload }       from '../payloads/index.js'
import { FillProfileNamePayload }              from '../payloads/index.js'
import { ListProfilesSerializer }              from '../serializers/index.js'
import { FillProfileGenderSerializer }         from '../serializers/index.js'
import { AddProfilePhotoSerializer }           from '../serializers/index.js'
import { FillProfileNameSerializer }           from '../serializers/index.js'
import { FillProfileGeopositionSerializer }    from '../serializers/index.js'
import { SkipProfileSerializer }               from '../serializers/index.js'
import { LikeProfileSerializer }               from '../serializers/index.js'
import { GetMatchesSerializer }                from '../serializers/index.js'

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
  async fillProfileGender(request: FillProfileGenderRequest): Promise<FillProfileGenderResponse> {
    const payload = new FillProfileGenderPayload(request)

    await this.validator.validate(payload)

    await this.commandBus.execute(new FillProfileGenderCommand(payload.profileId, payload.gender))

    return new FillProfileGenderSerializer(
      await this.queryBus.execute<GetProfileByIdQuery, Profile>(
        new GetProfileByIdQuery(payload.profileId)
      )
    )
  }

  @ConnectRpcMethod()
  async fillProfileName(request: FillProfileNameRequest): Promise<FillProfileNameResponse> {
    const payload = new FillProfileNamePayload(request)

    await this.validator.validate(payload)

    await this.commandBus.execute(new FillProfileNameCommand(payload.profileId, payload.name))

    return new FillProfileNameSerializer(
      await this.queryBus.execute<GetProfileByIdQuery, Profile>(
        new GetProfileByIdQuery(payload.profileId)
      )
    )
  }

  @ConnectRpcMethod()
  async fillProfileGeoposition(
    request: FillProfileGeopositionRequest
  ): Promise<FillProfileGeopositionResponse> {
    const payload = new FillProfileGeopositionPayload(request)

    await this.validator.validate(payload)

    await this.commandBus.execute(
      new FillProfileGeopositionCommand(payload.profileId, payload.latitude, payload.longitude)
    )

    return new FillProfileGeopositionSerializer(
      await this.queryBus.execute<GetProfileByIdQuery, Profile>(
        new GetProfileByIdQuery(payload.profileId)
      )
    )
  }

  @ConnectRpcMethod()
  async addProfilePhoto(request: AddProfilePhotoRequest): Promise<AddProfilePhotoResponse> {
    const payload = new AddProfilePhotoPayload(request)

    await this.validator.validate(payload)

    await this.commandBus.execute(new AddProfilePhotosCommand(payload.profileId, payload.photoId))

    return new AddProfilePhotoSerializer(
      await this.queryBus.execute<GetProfileByIdQuery, Profile>(
        new GetProfileByIdQuery(payload.profileId)
      )
    )
  }

  @ConnectRpcMethod()
  async skipProfile(request: SkipProfileRequest): Promise<SkipProfileResponse> {
    const payload = new SkipProfilePayload(request)

    await this.validator.validate(payload)

    await this.commandBus.execute(new SkipProfileCommand(payload.profileId, payload.targetId))

    return new SkipProfileSerializer(
      await this.queryBus.execute<GetProfileByIdQuery, Profile>(
        new GetProfileByIdQuery(payload.targetId)
      )
    )
  }

  @ConnectRpcMethod()
  async likeProfile(request: LikeProfileRequest): Promise<LikeProfileResponse> {
    const payload = new LikeProfilePayload(request)

    await this.validator.validate(payload)

    await this.commandBus.execute(new LikeProfileCommand(payload.profileId, payload.targetId))

    return new LikeProfileSerializer(
      await this.queryBus.execute<GetProfileByIdQuery, Profile>(
        new GetProfileByIdQuery(payload.targetId)
      )
    )
  }

  @ConnectRpcMethod()
  async getMatches(request: GetMatchesRequest): Promise<GetMatchesResponse> {
    const payload = new GetMatchesPayload(request)

    await this.validator.validate(payload)

    return new GetMatchesSerializer(
      await this.queryBus.execute<
        GetProfileMatchesQuery,
        {
          matches: Array<{ profile: Profile; similarity?: Similarity | undefined }>
          hasNextPage: boolean
        }
      >(new GetProfileMatchesQuery(payload.profileId))
    )
  }
}

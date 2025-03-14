import type * as rpc                         from '@profiles/client-module'
import type { ValidationError }              from '@monstrs/protobuf-rpc'

import type { FillProfileGenderErrors }      from '../errors/index.js'
import type { FillProfileNameErrors }        from '../errors/index.js'
import type { FillProfileGeopositionErrors } from '../errors/index.js'
import type { AddProfilePhotoErrors }        from '../errors/index.js'
import type { SkipProfileErrors }            from '../errors/index.js'
import type { LikeProfileErrors }            from '../errors/index.js'

import { Mutation }                          from '@nestjs/graphql'
import { Resolver }                          from '@nestjs/graphql'
import { Context }                           from '@nestjs/graphql'
import { Args }                              from '@nestjs/graphql'
import { findValidationErrorDetails }        from '@monstrs/protobuf-rpc'

import { ProfilesClient }                    from '@profiles/client-module'

import { FillProfileGenderInput }            from '../inputs/index.js'
import { SkipProfileInput }                  from '../inputs/index.js'
import { LikeProfileInput }                  from '../inputs/index.js'
import { AddProfilePhotoInput }              from '../inputs/index.js'
import { FillProfileGeopositionInput }       from '../inputs/index.js'
import { FillProfileNameInput }              from '../inputs/index.js'
import { FillProfileGenderResponse }         from '../responses/index.js'
import { FillProfileGeopositionResponse }    from '../responses/index.js'
import { SkipProfileResponse }               from '../responses/index.js'
import { LikeProfileResponse }               from '../responses/index.js'
import { AddProfilePhotoResponse }           from '../responses/index.js'
import { FillProfileNameResponse }           from '../responses/index.js'
import { Profile }                           from '../types/index.js'

@Resolver(() => Profile)
export class ProfileMutations {
  constructor(private readonly client: ProfilesClient) {}

  @Mutation(() => FillProfileGenderResponse)
  async fillProfileGender(
    @Args('input')
    input: FillProfileGenderInput,
    @Context('user') profileId: string
  ): Promise<{ result?: rpc.Profile; errors?: FillProfileGenderErrors }> {
    try {
      return await this.client.fillProfileGender(profileId, input.gender)
    } catch (error) {
      const details: Array<ValidationError> = findValidationErrorDetails(error)

      if (details.length > 0) {
        return {
          errors: details.reduce(
            (result, detail) => ({
              ...result,
              [detail.id]: {
                id: detail.messages.at(0)!.id,
                message: detail.messages.at(0)!.constraint,
              },
            }),
            {}
          ),
        }
      }

      throw error
    }
  }

  @Mutation(() => FillProfileNameResponse)
  async fillProfileName(
    @Args('input')
    input: FillProfileNameInput,
    @Context('user') profileId: string
  ): Promise<{ result?: rpc.Profile; errors?: FillProfileNameErrors }> {
    try {
      return await this.client.fillProfileName(profileId, input.name)
    } catch (error) {
      const details: Array<ValidationError> = findValidationErrorDetails(error)

      if (details.length > 0) {
        return {
          errors: details.reduce(
            (result, detail) => ({
              ...result,
              [detail.id]: {
                id: detail.messages.at(0)!.id,
                message: detail.messages.at(0)!.constraint,
              },
            }),
            {}
          ),
        }
      }

      throw error
    }
  }

  @Mutation(() => FillProfileGeopositionResponse)
  async fillProfileGeoposition(
    @Args('input')
    input: FillProfileGeopositionInput,
    @Context('user') profileId: string
  ): Promise<{ result?: rpc.Profile; errors?: FillProfileGeopositionErrors }> {
    try {
      return await this.client.fillProfileGeoposition(profileId, input.latitude, input.longitude)
    } catch (error) {
      const details: Array<ValidationError> = findValidationErrorDetails(error)

      if (details.length > 0) {
        return {
          errors: details.reduce(
            (result, detail) => ({
              ...result,
              [detail.id]: {
                id: detail.messages.at(0)!.id,
                message: detail.messages.at(0)!.constraint,
              },
            }),
            {}
          ),
        }
      }

      throw error
    }
  }

  @Mutation(() => AddProfilePhotoResponse)
  async addProfilePhoto(
    @Args('input')
    input: AddProfilePhotoInput,
    @Context('user') profileId: string
  ): Promise<{ result?: rpc.Profile; errors?: AddProfilePhotoErrors }> {
    try {
      return await this.client.addProfilePhoto(profileId, input.photoId)
    } catch (error) {
      const details: Array<ValidationError> = findValidationErrorDetails(error)

      if (details.length > 0) {
        return {
          errors: details.reduce(
            (result, detail) => ({
              ...result,
              [detail.id]: {
                id: detail.messages.at(0)!.id,
                message: detail.messages.at(0)!.constraint,
              },
            }),
            {}
          ),
        }
      }

      throw error
    }
  }

  @Mutation(() => SkipProfileResponse)
  async skipProfile(
    @Args('input')
    input: SkipProfileInput,
    @Context('user') profileId: string
  ): Promise<{ result?: rpc.Profile; errors?: SkipProfileErrors }> {
    try {
      return await this.client.skipProfile(profileId, input.targetId)
    } catch (error) {
      const details: Array<ValidationError> = findValidationErrorDetails(error)

      if (details.length > 0) {
        return {
          errors: details.reduce(
            (result, detail) => ({
              ...result,
              [detail.id]: {
                id: detail.messages.at(0)!.id,
                message: detail.messages.at(0)!.constraint,
              },
            }),
            {}
          ),
        }
      }

      throw error
    }
  }

  @Mutation(() => LikeProfileResponse)
  async likeProfile(
    @Args('input')
    input: LikeProfileInput,
    @Context('user') profileId: string
  ): Promise<{ result?: rpc.Profile; errors?: LikeProfileErrors }> {
    try {
      return await this.client.likeProfile(profileId, input.targetId)
    } catch (error) {
      const details: Array<ValidationError> = findValidationErrorDetails(error)

      if (details.length > 0) {
        return {
          errors: details.reduce(
            (result, detail) => ({
              ...result,
              [detail.id]: {
                id: detail.messages.at(0)!.id,
                message: detail.messages.at(0)!.constraint,
              },
            }),
            {}
          ),
        }
      }

      throw error
    }
  }
}

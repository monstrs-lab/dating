import type { ValidationError }              from '@monstrs/protobuf-rpc'

import type { FillProfileGenderErrors }      from '../errors/index.js'
import type { FillProfileNameErrors }        from '../errors/index.js'
import type { FillProfileGeopositionErrors } from '../errors/index.js'

import { Mutation }                          from '@nestjs/graphql'
import { Resolver }                          from '@nestjs/graphql'
import { Context }                           from '@nestjs/graphql'
import { Args }                              from '@nestjs/graphql'
import { findValidationErrorDetails }        from '@monstrs/protobuf-rpc'

import { ProfilesClient }                    from '@profiles/client-module'

import { FillProfileGenderInput }            from '../inputs/index.js'
import { FillProfileGeopositionInput }       from '../inputs/index.js'
import { FillProfileNameInput }              from '../inputs/index.js'
import { FillProfileGenderResponse }         from '../responses/index.js'
import { FillProfileGeopositionResponse }    from '../responses/index.js'
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
  ): Promise<{ result?: Profile; errors?: FillProfileGenderErrors }> {
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
  ): Promise<{ result?: Profile; errors?: FillProfileNameErrors }> {
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
  ): Promise<{ result?: Profile; errors?: FillProfileGeopositionErrors }> {
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
}

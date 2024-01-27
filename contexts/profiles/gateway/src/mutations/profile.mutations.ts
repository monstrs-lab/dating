import type { ValidationError }           from '@monstrs/protobuf-rpc'

import type { SelectProfileGenderErrors } from '../errors/index.js'
import type { ChangeProfileNameErrors }   from '../errors/index.js'

import { Mutation }                       from '@nestjs/graphql'
import { Resolver }                       from '@nestjs/graphql'
import { Context }                        from '@nestjs/graphql'
import { Args }                           from '@nestjs/graphql'
import { findValidationErrorDetails }     from '@monstrs/protobuf-rpc'

import { ProfilesClient }                 from '@profiles/client-module'

import { SelectProfileGenderInput }       from '../inputs/index.js'
import { ChangeProfileNameInput }         from '../inputs/index.js'
import { SelectProfileGenderResponse }    from '../responses/index.js'
import { ChangeProfileNameResponse }      from '../responses/index.js'
import { Profile }                        from '../types/index.js'

@Resolver(() => Profile)
export class ProfileMutations {
  constructor(private readonly client: ProfilesClient) {}

  @Mutation(() => SelectProfileGenderResponse)
  async selectProfileGender(
    @Args('input')
    input: SelectProfileGenderInput,
    @Context('user') profileId: string
  ): Promise<{ result?: Profile; errors?: SelectProfileGenderErrors }> {
    try {
      return await this.client.selectProfileGender(profileId, input.gender)
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

  @Mutation(() => ChangeProfileNameResponse)
  async changeProfileName(
    @Args('input')
    input: ChangeProfileNameInput,
    @Context('user') profileId: string
  ): Promise<{ result?: Profile; errors?: ChangeProfileNameErrors }> {
    try {
      return await this.client.changeProfileName(profileId, input.name)
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

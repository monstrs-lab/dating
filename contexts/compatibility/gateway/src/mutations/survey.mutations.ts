import type * as rpc                  from '@compatibility/client-module'
import type { ValidationError }       from '@monstrs/protobuf-rpc'

import type { StartSurveyErrors }     from '../errors/index.js'
import type { AddSurveyAnswerErrors } from '../errors/index.js'

import { Mutation }                   from '@nestjs/graphql'
import { Resolver }                   from '@nestjs/graphql'
import { Context }                    from '@nestjs/graphql'
import { Args }                       from '@nestjs/graphql'
import { findValidationErrorDetails } from '@monstrs/protobuf-rpc'

import { CompatibilityClient }        from '@compatibility/client-module'

import { StartSurveyInput }           from '../inputs/index.js'
import { AddSurveyAnswerInput }       from '../inputs/index.js'
import { StartSurveyResponse }        from '../responses/index.js'
import { AddSurveyAnswerResponse }    from '../responses/index.js'
import { Survey }                     from '../types/index.js'

@Resolver(() => Survey)
export class SurveyMutations {
  constructor(private readonly client: CompatibilityClient) {}

  @Mutation(() => StartSurveyResponse)
  async startSurvey(
    @Args('input')
    input: StartSurveyInput,
    @Context('user') intervieweeId: string
  ): Promise<{ result?: rpc.Survey; errors?: StartSurveyErrors }> {
    try {
      return await this.client.startSurvey(intervieweeId, input.questionaireId)
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

  @Mutation(() => AddSurveyAnswerResponse)
  async addSurveyAnswer(
    @Args('input')
    input: AddSurveyAnswerInput
  ): Promise<{ result?: rpc.Survey; errors?: AddSurveyAnswerErrors }> {
    try {
      return await this.client.addSurveyAnswer(input.surveyId, input.questionId, input.answer)
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

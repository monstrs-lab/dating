/* eslint-disable @typescript-eslint/consistent-type-imports */

import type * as rpc    from '@compatibility/client-module'

import type { Answer }  from '../types/index.js'

import { ResolveField } from '@nestjs/graphql'
import { Resolver }     from '@nestjs/graphql'
import { Parent }       from '@nestjs/graphql'

import { Survey }       from '../types/index.js'

@Resolver(() => Survey)
export class SurveyResolver {
  @ResolveField()
  answers(@Parent() { answers = {} }: rpc.Survey): Array<Answer> {
    return Object.keys(answers).map((id) => ({
      id,
      value: answers[id],
    }))
  }
}

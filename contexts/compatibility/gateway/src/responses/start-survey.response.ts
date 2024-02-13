import { Field }             from '@nestjs/graphql'
import { ObjectType }        from '@nestjs/graphql'

import { StartSurveyErrors } from '../errors/index.js'
import { Survey }            from '../types/index.js'

@ObjectType()
export class StartSurveyResponse {
  @Field(() => Survey, { nullable: true })
  result?: Survey

  @Field(() => StartSurveyErrors, { nullable: true })
  errors?: StartSurveyErrors
}

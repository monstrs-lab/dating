import { Field }                 from '@nestjs/graphql'
import { ObjectType }            from '@nestjs/graphql'

import { AddSurveyAnswerErrors } from '../errors/index.js'
import { Survey }                from '../types/index.js'

@ObjectType()
export class AddSurveyAnswerResponse {
  @Field(() => Survey, { nullable: true })
  result?: Survey

  @Field(() => AddSurveyAnswerErrors, { nullable: true })
  errors?: AddSurveyAnswerErrors
}

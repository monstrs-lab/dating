import { Field }           from '@nestjs/graphql'
import { ObjectType }      from '@nestjs/graphql'

import { ValidationError } from '@shared/gateway-types'

@ObjectType()
export class AddSurveyAnswerErrors {
  @Field(() => ValidationError, { nullable: true })
  surveyId?: ValidationError

  @Field(() => ValidationError, { nullable: true })
  questionId?: ValidationError

  @Field(() => ValidationError, { nullable: true })
  answer?: ValidationError
}

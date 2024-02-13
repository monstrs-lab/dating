import { Field }        from '@nestjs/graphql'
import { ObjectType }   from '@nestjs/graphql'

import { SurveyStatus } from '../enums/index.js'
import { Answer }       from './answer.type.js'

@ObjectType()
export class Survey {
  @Field()
  id!: string

  @Field(() => SurveyStatus)
  status!: SurveyStatus

  @Field(() => [Answer])
  answers!: Array<Answer>
}

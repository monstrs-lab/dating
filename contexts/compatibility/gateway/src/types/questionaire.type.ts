import { Field }              from '@nestjs/graphql'
import { ObjectType }         from '@nestjs/graphql'

import { File }               from '@files/gateway-module'

import { QuestionaireStatus } from '../enums/index.js'
import { Question }           from './question.type.js'
import { Survey }             from './survey.type.js'

@ObjectType()
export class Questionaire {
  @Field()
  id!: string

  @Field(() => QuestionaireStatus)
  status!: QuestionaireStatus

  @Field()
  name!: string

  @Field(() => File, { nullable: true })
  photo?: File

  @Field(() => [Question])
  questions!: Array<Question>

  @Field(() => Survey, { nullable: true })
  survey?: Survey
}

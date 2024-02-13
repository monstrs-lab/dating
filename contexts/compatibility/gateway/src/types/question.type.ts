import { Field }      from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Question {
  @Field()
  id!: string

  @Field()
  content!: string
}

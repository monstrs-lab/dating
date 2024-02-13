import { Field }      from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Answer {
  @Field()
  id!: string

  @Field({ nullable: true })
  value?: number
}

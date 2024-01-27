import { Field }      from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ValidationError {
  @Field()
  id!: string

  @Field()
  message!: string
}

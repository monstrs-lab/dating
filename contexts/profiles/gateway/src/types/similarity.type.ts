import { Field }      from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Similarity {
  @Field()
  id!: string

  @Field()
  value!: number
}

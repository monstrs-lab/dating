import { Field }     from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'

@InputType()
export class SkipProfileInput {
  @Field()
  targetId!: string
}

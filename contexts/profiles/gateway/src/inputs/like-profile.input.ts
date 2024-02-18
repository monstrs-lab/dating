import { Field }     from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'

@InputType()
export class LikeProfileInput {
  @Field()
  targetId!: string
}

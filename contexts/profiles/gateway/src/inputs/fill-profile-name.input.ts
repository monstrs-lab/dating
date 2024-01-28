import { Field }     from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'

@InputType()
export class FillProfileNameInput {
  @Field()
  name!: string
}

import { Field }     from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'

@InputType()
export class FillProfileGeopositionInput {
  @Field()
  latitude!: number

  @Field()
  longitude!: number
}

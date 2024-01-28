import { Field }         from '@nestjs/graphql'
import { InputType }     from '@nestjs/graphql'

import { ProfileGender } from '../enums/index.js'

@InputType()
export class FillProfileGenderInput {
  @Field(() => ProfileGender)
  gender!: ProfileGender
}

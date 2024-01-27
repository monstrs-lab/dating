import { Field }         from '@nestjs/graphql'
import { InputType }     from '@nestjs/graphql'

import { ProfileGender } from '../enums/index.js'

@InputType()
export class SelectProfileGenderInput {
  @Field(() => ProfileGender)
  gender!: ProfileGender
}

import { Field }                   from '@nestjs/graphql'
import { ObjectType }              from '@nestjs/graphql'

import { FillProfileGenderErrors } from '../errors/index.js'
import { Profile }                 from '../types/index.js'

@ObjectType()
export class FillProfileGenderResponse {
  @Field(() => Profile, { nullable: true })
  result?: Profile

  @Field(() => FillProfileGenderErrors, { nullable: true })
  errors?: FillProfileGenderErrors
}

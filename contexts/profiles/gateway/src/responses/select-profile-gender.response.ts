import { Field }                     from '@nestjs/graphql'
import { ObjectType }                from '@nestjs/graphql'

import { SelectProfileGenderErrors } from '../errors/index.js'
import { Profile }                   from '../types/index.js'

@ObjectType()
export class SelectProfileGenderResponse {
  @Field(() => Profile, { nullable: true })
  result?: Profile

  @Field(() => SelectProfileGenderErrors, { nullable: true })
  errors?: SelectProfileGenderErrors
}

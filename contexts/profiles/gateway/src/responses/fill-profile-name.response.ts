import { Field }                 from '@nestjs/graphql'
import { ObjectType }            from '@nestjs/graphql'

import { FillProfileNameErrors } from '../errors/index.js'
import { Profile }               from '../types/index.js'

@ObjectType()
export class FillProfileNameResponse {
  @Field(() => Profile, { nullable: true })
  result?: Profile

  @Field(() => FillProfileNameErrors, { nullable: true })
  errors?: FillProfileNameErrors
}

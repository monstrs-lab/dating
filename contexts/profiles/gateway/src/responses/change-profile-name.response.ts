import { Field }                   from '@nestjs/graphql'
import { ObjectType }              from '@nestjs/graphql'

import { ChangeProfileNameErrors } from '../errors/index.js'
import { Profile }                 from '../types/index.js'

@ObjectType()
export class ChangeProfileNameResponse {
  @Field(() => Profile, { nullable: true })
  result?: Profile

  @Field(() => ChangeProfileNameErrors, { nullable: true })
  errors?: ChangeProfileNameErrors
}

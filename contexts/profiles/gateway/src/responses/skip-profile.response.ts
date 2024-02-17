import { Field }             from '@nestjs/graphql'
import { ObjectType }        from '@nestjs/graphql'

import { SkipProfileErrors } from '../errors/index.js'
import { Profile }           from '../types/index.js'

@ObjectType()
export class SkipProfileResponse {
  @Field(() => Profile, { nullable: true })
  result?: Profile

  @Field(() => SkipProfileErrors, { nullable: true })
  errors?: SkipProfileErrors
}

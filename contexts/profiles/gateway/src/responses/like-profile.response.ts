import { Field }             from '@nestjs/graphql'
import { ObjectType }        from '@nestjs/graphql'

import { LikeProfileErrors } from '../errors/index.js'
import { Profile }           from '../types/index.js'

@ObjectType()
export class LikeProfileResponse {
  @Field(() => Profile, { nullable: true })
  result?: Profile

  @Field(() => LikeProfileErrors, { nullable: true })
  errors?: LikeProfileErrors
}

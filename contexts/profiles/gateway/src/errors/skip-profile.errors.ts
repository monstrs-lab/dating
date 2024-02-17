import { Field }           from '@nestjs/graphql'
import { ObjectType }      from '@nestjs/graphql'

import { ValidationError } from '@shared/gateway-types'

@ObjectType()
export class SkipProfileErrors {
  @Field(() => ValidationError, { nullable: true })
  targetId?: ValidationError
}

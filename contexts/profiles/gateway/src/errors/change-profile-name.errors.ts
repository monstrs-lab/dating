import { Field }           from '@nestjs/graphql'
import { ObjectType }      from '@nestjs/graphql'

import { ValidationError } from '@shared/gateway-types'

@ObjectType()
export class ChangeProfileNameErrors {
  @Field(() => ValidationError, { nullable: true })
  name?: ValidationError
}

import { Field }           from '@nestjs/graphql'
import { ObjectType }      from '@nestjs/graphql'

import { ValidationError } from '@shared/gateway-types'

@ObjectType()
export class FillProfileGeopositionErrors {
  @Field(() => ValidationError, { nullable: true })
  latitude?: ValidationError

  @Field(() => ValidationError, { nullable: true })
  longitude?: ValidationError
}

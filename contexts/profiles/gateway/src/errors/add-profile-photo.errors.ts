import { Field }           from '@nestjs/graphql'
import { ObjectType }      from '@nestjs/graphql'

import { ValidationError } from '@shared/gateway-types'

@ObjectType()
export class AddProfilePhotoErrors {
  @Field(() => ValidationError, { nullable: true })
  photoId?: ValidationError
}

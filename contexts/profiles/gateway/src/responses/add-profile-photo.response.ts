import { Field }                 from '@nestjs/graphql'
import { ObjectType }            from '@nestjs/graphql'

import { AddProfilePhotoErrors } from '../errors/index.js'
import { Profile }               from '../types/index.js'

@ObjectType()
export class AddProfilePhotoResponse {
  @Field(() => Profile, { nullable: true })
  result?: Profile

  @Field(() => AddProfilePhotoErrors, { nullable: true })
  errors?: AddProfilePhotoErrors
}

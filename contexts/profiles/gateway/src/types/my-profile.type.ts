import { Field }      from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'

import { Profile }    from './profile.type.js'

@ObjectType()
export class MyProfile {
  @Field(() => Profile)
  info!: Profile
}

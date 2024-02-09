import { Field }      from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'

import { MyMatches }  from '@matches/gateway-module'
import { MyProfile }  from '@profiles/gateway-module'

@ObjectType()
export class User {
  @Field()
  id!: string

  @Field(() => MyProfile)
  profile!: MyProfile

  @Field(() => MyMatches)
  matches!: MyMatches
}

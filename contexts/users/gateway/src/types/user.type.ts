import { Field }             from '@nestjs/graphql'
import { ObjectType }        from '@nestjs/graphql'

import { MyProfile }         from '@profiles/gateway-module'
import { MyRecommendations } from '@recommendations/gateway-module'

@ObjectType()
export class User {
  @Field()
  id!: string

  @Field(() => MyProfile)
  profile!: MyProfile

  @Field(() => MyRecommendations)
  recommendations!: MyRecommendations
}

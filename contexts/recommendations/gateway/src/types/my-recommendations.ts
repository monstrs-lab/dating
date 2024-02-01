import { Field }      from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'

import { Profile }    from '@profiles/gateway-module'

@ObjectType()
export class MyRecommendations {
  @Field(() => [Profile])
  profiles!: Array<Profile>
}

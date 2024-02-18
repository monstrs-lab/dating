import { Field }      from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'

import { Profile }    from './profile.type.js'
import { Similarity } from './similarity.type.js'

@ObjectType()
export class Match {
  @Field(() => Profile)
  profile!: Profile

  @Field(() => Similarity, { nullable: true })
  similarity?: Similarity
}

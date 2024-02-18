import { Field }      from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'

import { Matches }    from './matches.type.js'

@ObjectType()
export class MyMatching {
  @Field(() => Matches)
  matches!: Matches
}

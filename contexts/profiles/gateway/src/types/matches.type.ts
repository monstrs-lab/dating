import { Field }      from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'

import { Match }      from './match.type.js'

@ObjectType()
export class Matches {
  @Field(() => [Match])
  matches!: Match

  @Field()
  hasNextPage!: boolean
}

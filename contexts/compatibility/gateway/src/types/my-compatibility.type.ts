import { Field }        from '@nestjs/graphql'
import { ObjectType }   from '@nestjs/graphql'

import { Questionaire } from './questionaire.type.js'

@ObjectType()
export class MyCompatibility {
  @Field(() => [Questionaire])
  questionaires!: Array<Questionaire>
}

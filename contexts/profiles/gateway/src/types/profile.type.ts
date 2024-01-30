import { Field }         from '@nestjs/graphql'
import { ObjectType }    from '@nestjs/graphql'

import { File }          from '@files/gateway-module'

import { ProfileGender } from '../enums/index.js'

@ObjectType()
export class Profile {
  @Field()
  id!: string

  @Field(() => ProfileGender, { nullable: true })
  gender?: ProfileGender

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  location?: string

  @Field(() => [File])
  photos!: Array<File>
}

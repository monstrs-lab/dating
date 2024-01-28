import { Field }                        from '@nestjs/graphql'
import { ObjectType }                   from '@nestjs/graphql'

import { FillProfileGeopositionErrors } from '../errors/index.js'
import { Profile }                      from '../types/index.js'

@ObjectType()
export class FillProfileGeopositionResponse {
  @Field(() => Profile, { nullable: true })
  result?: Profile

  @Field(() => FillProfileGeopositionErrors, { nullable: true })
  errors?: FillProfileGeopositionErrors
}

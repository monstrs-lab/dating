import { Resolver }     from '@nestjs/graphql'
import { ResolveField } from '@nestjs/graphql'

import { User }         from '../types/index.js'

@Resolver(() => User)
export class UserResolver {
  @ResolveField()
  profile(): Record<string, never> {
    return {}
  }
}

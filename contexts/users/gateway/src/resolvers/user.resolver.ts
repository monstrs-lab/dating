import { Resolver }     from '@nestjs/graphql'
import { ResolveField } from '@nestjs/graphql'

import { User }         from '../types/index.js'

@Resolver(() => User)
export class UserResolver {
  @ResolveField()
  profile(): Record<string, never> {
    return {}
  }

  @ResolveField()
  matching(): Record<string, never> {
    return {}
  }

  @ResolveField()
  matches(): Record<string, never> {
    return {}
  }

  @ResolveField()
  compatibility(): Record<string, never> {
    return {}
  }
}

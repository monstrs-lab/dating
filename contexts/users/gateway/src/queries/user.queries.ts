import { Injectable } from '@nestjs/common'
import { Query }      from '@nestjs/graphql'
import { Context }    from '@nestjs/graphql'

import { User }       from '../types/index.js'

@Injectable()
export class UserQueries {
  @Query(() => User)
  my(@Context('user') id: string): { id: string } {
    return {
      id,
    }
  }
}

/* eslint-disable @typescript-eslint/consistent-type-imports */

import type * as rpc      from '@profiles/client-module'

import { ResolveField }   from '@nestjs/graphql'
import { Resolver }       from '@nestjs/graphql'
import { Parent }         from '@nestjs/graphql'
import { Loader }         from 'nestjs-dataloader'
import DataLoader         from 'dataloader'

import { FileDataLoader } from '@files/gateway-module'

import { Profile }        from '../types/index.js'

@Resolver(() => Profile)
export class ProfileResolver {
  @ResolveField()
  async photos(
    @Parent() { photos }: rpc.Profile,
    @Loader(FileDataLoader)
    loader: DataLoader<string, File>
  ): Promise<Array<File>> {
    return loader.loadMany(photos) as Promise<Array<File>>
  }
}
